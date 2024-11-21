import { type Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/Button";
import { TextField } from "@/components/Fields";
import { Logo } from "@/components/Logo";
import { SlimLayout } from "@/components/SlimLayout";

export const metadata: Metadata = {
  title: "Sign In",
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
        Sign in to your account
      </h2>
      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
        Don’t have an account? Enter your email to create one.
      </p>
      <form action="#" className="mt-8 grid grid-cols-1 gap-y-4">
        <TextField
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
        <div className="mt-4">
          <Button
            href="/verify"
            type="submit"
            variant="solid"
            color="blue"
            className="w-full"
          >
            <span>
              Go <span aria-hidden="true">&rarr;</span>
            </span>
          </Button>
        </div>
      </form>
    </SlimLayout>
  );
}
