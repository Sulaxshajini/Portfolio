import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import Chatbot from '@/components/Chatbot';
import CustomCursor from '@/components/ui/CustomCursor';
import ScrollProgress from '@/components/ui/ScrollProgress';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Sulaxshajini Kumarakulasingam | IT Support & Infrastructure',
  description: 'Portfolio of Sulaxshajini Kumarakulasingam, an Information Technology undergraduate specializing in IT support, systems troubleshooting, databases and technical problem solving.',
};

const themeInitScript = `
(function() {
  try {
    var themes = [
      "midnight-cyan",
      "neon-lime",
      "magenta-luxe",
      "forest-ivory",
      "cream-cobalt",
      "deep-space",
      "burgundy-blush",
      "midnight-peach"
    ];
    var metaColors = {
      "midnight-cyan": "#07111F",
      "neon-lime": "#0B1020",
      "magenta-luxe": "#101014",
      "forest-ivory": "#102820",
      "cream-cobalt": "#FAF7F0",
      "deep-space": "#080D1A",
      "burgundy-blush": "#3B1025",
      "midnight-peach": "#111827"
    };

    var params = new URLSearchParams(window.location.search);
    var requested = params.get('theme') || params.get('design');
    var selected = null;

    if (requested) {
      if (requested !== 'random') {
        if (!isNaN(Number(requested)) && Number(requested) >= 1 && Number(requested) <= themes.length) {
          selected = themes[Number(requested) - 1];
        } else if (themes.indexOf(requested) !== -1) {
          selected = requested;
        }
      }
    }

    if (!selected) {
      var last = null;
      try {
        last = localStorage.getItem('portfolio_theme');
      } catch (e) {}

      var pool = themes.filter(function(t) { return t !== last; });
      if (pool.length === 0) pool = themes;
      selected = pool[Math.floor(Math.random() * pool.length)];
    }

    try {
      localStorage.setItem('portfolio_theme', selected);
    } catch (e) {}

    document.documentElement.setAttribute('data-theme', selected);
    document.documentElement.style.colorScheme = selected === 'cream-cobalt' ? 'light' : 'dark';

    var meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'theme-color';
      document.head.appendChild(meta);
    }
    meta.content = metaColors[selected] || '#07111F';
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'midnight-cyan');
  }
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased scroll-smooth`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen bg-primary-bg text-text-primary selection:bg-accent-primary selection:text-primary-bg">
        <SmoothScrollProvider>
          <CustomCursor />
          <ScrollProgress />
          <Navbar />
          {children}
          <Footer />
          <Chatbot />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
