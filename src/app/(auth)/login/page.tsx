import { type Metadata } from "next";
import Link from "next/link";

import { Logo } from "@/components/Logo";
import { SlimLayout } from "@/components/SlimLayout";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function Login() {
  return (
    <SlimLayout>
      {/* Header and static content */}
      <div className="flex h-10 items-center">
        <Link href="/" aria-label="Home">
          <Logo className="h-6 w-auto" />
        </Link>
      </div>
      <h2 className="mt-12 text-lg font-semibold text-gray-900 dark:text-gray-100">
        Sign in to your account
      </h2>
      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
        Don&apos;t have an account? Enter your email to create one.
      </p>
      {/* Client-side form */}
      <LoginForm />
    </SlimLayout>
  );
}
