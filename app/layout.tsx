import './globals.css';
import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/sonner';
import { brand } from '@/config/brand';
import { AuthProvider } from '@/lib/auth/auth-context';

export const metadata: Metadata = {
  title: `${brand.name} | ${brand.tagline}`,
  description: brand.description,
};

export const viewport = {
  themeColor: '#0B0B0C',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={brand.locale} dir="rtl" className="dark">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster position="top-center" theme="dark" />
      </body>
    </html>
  );
}
