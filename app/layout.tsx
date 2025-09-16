import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'AlphaFlow AI - Your AI Trading Coach',
  description: 'Trade Smarter, Not Harder. AI-powered trading coach for crypto traders.',
  openGraph: {
    title: 'AlphaFlow AI',
    description: 'Your AI Trading Coach: Trade Smarter, Not Harder.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-900 text-white">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
