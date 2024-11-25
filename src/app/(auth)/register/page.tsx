import { type Metadata } from "next";
import Link from "next/link";

import { Logo } from "@/components/Logo";
import { SlimLayout } from "@/components/SlimLayout";
import RegisterForm from "@/components/RegisterForm";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function Register() {
  return (
    <SlimLayout>
      <div className="flex h-10 items-center">
        <Link href="/" aria-label="Home">
          <Logo className="h-6 w-auto" />
        </Link>
      </div>
      <h2 className="mt-12 text-lg font-semibold text-gray-900 dark:text-gray-100">
        Get started for free
      </h2>
      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
        Complete the form below to create your account.
      </p>
      <RegisterForm />
    </SlimLayout>
  );
}
