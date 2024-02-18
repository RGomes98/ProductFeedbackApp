import { Jost } from 'next/font/google';
import type { Metadata } from 'next';

import '@/stylesheets/globals.scss';

const jost = Jost({
  display: 'swap',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  fallback: ['system-ui', 'sans-serif'],
});

export const metadata: Metadata = {
  title: 'Product Feedback App',
  description: 'Product Feedback App Fullstack Challenge',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en'>
      <body className={jost.className}>{children}</body>
    </html>
  );
}
