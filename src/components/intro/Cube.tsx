import type { CSSProperties } from "react";

/** Pure-CSS 3D cube: no WebGL, no assets, negligible cost. */
export default function Cube({ size, style, duration = 24 }: { size: number; style?: CSSProperties; duration?: number }) {
  const h = size / 2;
  const faces = [
    `translateZ(${h}px)`,
    `rotateY(180deg) translateZ(${h}px)`,
    `rotateY(90deg) translateZ(${h}px)`,
    `rotateY(-90deg) translateZ(${h}px)`,
    `rotateX(90deg) translateZ(${h}px)`,
    `rotateX(-90deg) translateZ(${h}px)`,
  ];
  return (
    <div style={{ perspective: 800, ...style }} aria-hidden>
      <div className="cube" style={{ width: size, height: size, animationDuration: `${duration}s` }}>
        {faces.map((t, i) => (
          <i key={i} style={{ transform: t }} />
        ))}
      </div>
    </div>
  );
}
