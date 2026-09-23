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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} antialiased scroll-smooth`}>
      <body className="min-h-screen bg-primary-bg text-text-primary selection:bg-accent-primary selection:text-black">
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
