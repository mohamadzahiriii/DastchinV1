import Link from 'next/link';
import { Bell, Headset, Heart, MapPin, ReceiptText, UserRound } from 'lucide-react';
import { DemoActionButton } from '@/components/shared/DemoActionButton';
import { DemoNotice, PageHeader } from '@/components/shared/PageHeader';
import { OrderStatusBadge } from '@/components/shared/OrderStatusBadge';
import { getProduct } from '@/data/lookup';
import { orders } from '@/data/orders';
import { formatPersianDate, formatToman } from '@/lib/format';

const addresses = [
  { label: 'منزل', address: 'تهران، ونک، خیابان ملاصدرا، کوچه ۶، واحد ۴' },
  { label: 'محل کار', address: 'تهران، زعفرانیه، بلوار کاوه، پلاک ۱۸' },
];

const notifications = [
  { title: 'بسته شما برای امروز آماده است', time: 'امروز، ۰۹:۳۰' },
  { title: 'محصول جدیدی در ونک اضافه شد', time: 'دیروز' },
];

function Section({ id, icon: Icon, title, children }: { id?: string; icon: typeof UserRound; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="flex scroll-mt-24 flex-col gap-5 rounded-2xl border border-ink-800 bg-ink-900 p-6">
      <h2 className="flex items-center gap-2 text-base font-semibold text-ink-50">
        <Icon className="h-4 w-4 text-saffron-300" aria-hidden /> {title}
      </h2>
      {children}
    </section>
  );
}

export default function ProfilePage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-12 md:px-8">
      <PageHeader title="حساب کاربری" description="اطلاعات شخصی، نشانی‌ها و سفارش‌های خود را مدیریت کنید." />
      <DemoNotice>اطلاعات این صفحه نمونه است. ورود و ذخیره‌سازی واقعی در مراحل بعدی فعال می‌شود.</DemoNotice>

      <div className="grid gap-6 md:grid-cols-2">
        <Section icon={UserRound} title="اطلاعات شخصی">
          <dl className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
            {[
              ['نام و نام خانوادگی', 'نگار رضایی'],
              ['شماره موبایل', '۰۹۱۲···۱۲۳۴'],
              ['ایمیل', 'negar@example.com'],
              ['شهر', 'تهران'],
            ].map(([label, value]) => (
              <div key={label} className="flex flex-col gap-1">
                <dt className="text-xs text-ink-400">{label}</dt>
                <dd className="font-medium text-ink-50">{value}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section icon={MapPin} title="نشانی‌های ذخیره‌شده">
          <ul className="flex flex-col gap-3">
            {addresses.map((a) => (
              <li key={a.label} className="flex flex-col gap-1 rounded-xl border border-ink-800 p-4">
                <span className="text-xs font-semibold text-saffron-300">{a.label}</span>
                <span className="text-sm leading-relaxed text-ink-200">{a.address}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section icon={ReceiptText} title="تاریخچه سفارش‌ها">
          <ul className="flex flex-col gap-3">
            {orders.slice(0, 3).map((o) => (
              <li key={o.id} className="flex items-center justify-between gap-3 text-sm">
                <Link href={`/orders/${o.id}`} className="flex flex-col gap-1 text-ink-50 hover:text-saffron-300">
                  {getProduct(o.productId)?.name}
                  <span className="text-xs text-ink-400">{formatPersianDate(o.placedAt)} · {formatToman(o.total)}</span>
                </Link>
                <OrderStatusBadge status={o.status} />
              </li>
            ))}
          </ul>
          <Link href="/orders" className="text-sm font-medium text-saffron-300 hover:underline">همه سفارش‌ها</Link>
        </Section>

        <Section icon={Heart} title="علاقه‌مندی‌ها">
          <p className="text-sm leading-relaxed text-ink-300">محصولات و فروشگاه‌های ذخیره‌شده را در صفحه علاقه‌مندی‌ها ببینید.</p>
          <Link href="/favorites" className="w-fit text-sm font-medium text-saffron-300 hover:underline">مشاهده علاقه‌مندی‌ها</Link>
        </Section>

        <Section icon={Bell} title="اعلان‌ها">
          <ul className="flex flex-col gap-3">
            {notifications.map((n) => (
              <li key={n.title} className="flex flex-col gap-1 text-sm">
                <span className="text-ink-100">{n.title}</span>
                <span className="text-xs text-ink-400">{n.time}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="support" icon={Headset} title="پشتیبانی">
          <p className="text-sm leading-relaxed text-ink-300">
            برای مشکل در سفارش، کیفیت محصول یا اطلاعات نگهداری، درخواست خود را ثبت کنید.
          </p>
          <DemoActionButton label="ثبت درخواست پشتیبانی (نمایشی)" message="ثبت درخواست در نسخه نمایشی فعال نیست." variant="primary" />
        </Section>
      </div>
    </div>
  );
}
