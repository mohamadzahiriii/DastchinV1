import { CustomerBottomNav, CustomerHeader } from '@/features/customer/layout/CustomerNavigation';
import { CustomerFooter } from '@/features/customer/layout/CustomerFooter';

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-ink-950">
      <CustomerHeader />
      <main className="flex-1 pb-24 md:pb-0">{children}</main>
      <CustomerFooter />
      <CustomerBottomNav />
    </div>
  );
}
