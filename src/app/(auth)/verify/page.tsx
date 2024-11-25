import { type Metadata } from "next";
import Link from "next/link";

import { OtpForm } from "@/components/OtpForm";
import { Logo } from "@/components/Logo";
import { SlimLayout } from "@/components/SlimLayout";

export const metadata: Metadata = {
  title: "Verify Password",
};

export default function Login() {
  return (
    <SlimLayout>
      <div className="flex h-10 items-center">
        <Link href="/" aria-label="Home">
          <Logo className="h-6 w-auto" />
        </Link>
      </div>
      <h2 className="mt-12 text-lg font-semibold text-gray-900 dark:text-gray-100">
        Verify your one time password
      </h2>
      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
        Enter the 6-digit code we sent to your email address.
      </p>
      <OtpForm />
    </SlimLayout>
  );
}
