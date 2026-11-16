import { AuthForm } from '@/features/auth/AuthForm';

export default function SignupPage() {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-ink-800 bg-ink-900 p-8">
      <h1 className="mb-6 text-center text-xl font-bold text-ink-50">ساخت حساب جدید</h1>
      <AuthForm mode="signup" />
    </div>
  );
}
