import { NextResponse } from "next/server";
import { buildSystemPrompt, deriveActions, fallbackReply, suggestionsAfter } from "@/lib/knowledge";
import { profile } from "@/data/profile";

export const runtime = "nodejs";

/**
 * DING MOTOBOT backend.
 *  - Keys live in server env vars only (ANTHROPIC_API_KEY or OPENAI_API_KEY). Never sent to the browser.
 *  - If neither key is set (or the provider errors) the route answers with the deterministic,
 *    portfolio-grounded fallback and reports mode: "fallback" – it never pretends to be AI.
 *  - Input is validated and rate limited per client IP (in-memory: per server instance).
 */

type Msg = { role: "user" | "assistant"; content: string };

const MAX_MESSAGES = 12;
const MAX_CHARS = 500;
const WINDOW_MS = 60_000;
const MAX_REQ = 15;
const hits = new Map<string, { n: number; reset: number }>();

function limited(ip: string) {
  const now = Date.now();
  if (hits.size > 5000) for (const [k, v] of hits) if (v.reset < now) hits.delete(k);
  const h = hits.get(ip);
  if (!h || h.reset < now) { hits.set(ip, { n: 1, reset: now + WINDOW_MS }); return false; }
  h.n += 1;
  return h.n > MAX_REQ;
}

function validate(body: unknown): Msg[] | null {
  if (!body || typeof body !== "object") return null;
  const raw = (body as { messages?: unknown }).messages;
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > MAX_MESSAGES * 2) return null;
  const out: Msg[] = [];
  for (const m of raw.slice(-MAX_MESSAGES)) {
    if (!m || typeof m !== "object") return null;
    const { role, content } = m as Record<string, unknown>;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const text = content.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, MAX_CHARS);
    if (!text) return null;
    out.push({ role, content: text });
  }
  while (out.length && out[0].role !== "user") out.shift();
  if (!out.length || out[out.length - 1].role !== "user") return null;
  return out;
}

const b64 = (o: unknown) => Buffer.from(JSON.stringify(o), "utf8").toString("base64");

function headers(mode: "ai" | "fallback", meta: unknown): HeadersInit {
  return { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", "x-ding-mode": mode, "x-ding-meta": b64(meta), "X-Content-Type-Options": "nosniff" };
}

function fallbackResponse(question: string) {
  const reply = fallbackReply(question);
  return new Response(reply, { headers: headers("fallback", { actions: deriveActions(question), suggestions: suggestionsAfter(question) }) });
}

async function streamAnthropic(msgs: Msg[], key: string, signal: AbortSignal) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST", signal,
    headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({ model: process.env.ANTHROPIC_MODEL || "claude-sonnet-5-5", max_tokens: 450, system: buildSystemPrompt(), messages: msgs, stream: true }),
  });
  return res;
}

async function streamOpenAI(msgs: Msg[], key: string, signal: AbortSignal) {
  return fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST", signal,
    headers: { "content-type": "application/json", authorization: `Bearer ${key}` },
    body: JSON.stringify({ model: process.env.OPENAI_MODEL || "gpt-4o-mini", max_tokens: 450, stream: true, messages: [{ role: "system", content: buildSystemPrompt() }, ...msgs] }),
  });
}

type SSEJson = { type?: string; delta?: { type?: string; text?: string }; choices?: { delta?: { content?: string } }[] };

function pipeSSE(upstream: Response, pick: (json: SSEJson) => string | undefined, onDone: () => void) {
  const reader = upstream.body!.getReader();
  const dec = new TextDecoder();
  const enc = new TextEncoder();
  let buf = "";
  return new ReadableStream<Uint8Array>({
    async pull(ctrl) {
      try {
        const { done, value } = await reader.read();
        if (done) { onDone(); ctrl.close(); return; }
        buf += dec.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data:")) continue;
          const data = line.slice(5).trim();
          if (!data || data === "[DONE]") continue;
          try { const t = pick(JSON.parse(data)); if (t) ctrl.enqueue(enc.encode(t)); } catch { /* ignore keep-alives */ }
        }
      } catch { onDone(); ctrl.close(); }
    },
    cancel() { reader.cancel().catch(() => {}); onDone(); },
  });
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "local";
  if (limited(ip)) {
    return NextResponse.json({ error: "rate_limited", message: "Whoa, that's a lot of questions! Give me a minute to catch my breath." }, { status: 429, headers: { "Retry-After": "60" } });
  }

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "bad_request", message: "Invalid JSON." }, { status: 400 }); }
  const msgs = validate(body);
  if (!msgs) return NextResponse.json({ error: "bad_request", message: "Please send 1–12 short messages (max 500 characters each)." }, { status: 400 });

  const question = msgs[msgs.length - 1].content;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;
  if (!anthropicKey && !openaiKey) return fallbackResponse(question);

  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), 25_000);
  try {
    const upstream = anthropicKey ? await streamAnthropic(msgs, anthropicKey, ctl.signal) : await streamOpenAI(msgs, openaiKey!, ctl.signal);
    if (!upstream.ok || !upstream.body) {
      clearTimeout(timer);
      console.error("[ding] provider error", upstream.status);
      return fallbackResponse(question);
    }
    const pick = anthropicKey
      ? (j: SSEJson) => (j.type === "content_block_delta" && j.delta?.type === "text_delta" ? j.delta.text : undefined)
      : (j: SSEJson) => j.choices?.[0]?.delta?.content;
    const stream = pipeSSE(upstream, pick, () => clearTimeout(timer));
    return new Response(stream, { headers: headers("ai", { actions: deriveActions(question), suggestions: suggestionsAfter(question) }) });
  } catch (err) {
    clearTimeout(timer);
    console.error("[ding] request failed", (err as Error).name);
    return fallbackResponse(question);
  }
}

export async function GET() {
  return NextResponse.json({ name: "DING MOTOBOT", owner: profile.name, ai: Boolean(process.env.ANTHROPIC_API_KEY || process.env.OPENAI_API_KEY) });
}
