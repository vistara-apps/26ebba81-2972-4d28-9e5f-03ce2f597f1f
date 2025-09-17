import type { Metadata } from 'next';
import { Providers } from './providers';
import { ErrorBoundary } from '../components/ErrorBoundary';
import './globals.css';

export const metadata: Metadata = {
  title: 'AlphaFlow AI - Your AI Trading Coach',
  description: 'Trade Smarter, Not Harder. AI-powered trading coach for crypto traders.',
  keywords: ['AI', 'trading', 'crypto', 'coach', 'Base', 'miniapp'],
  authors: [{ name: 'AlphaFlow AI' }],
  openGraph: {
    title: 'AlphaFlow AI',
    description: 'Your AI Trading Coach: Trade Smarter, Not Harder.',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AlphaFlow AI',
    description: 'Your AI Trading Coach: Trade Smarter, Not Harder.',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#1e293b',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-text-primary">
        <Providers>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </Providers>
      </body>
    </html>
  );
}
