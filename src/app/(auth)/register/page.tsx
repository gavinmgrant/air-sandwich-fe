import { type Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/Button";
import { TextField } from "@/components/Fields";
import { Logo } from "@/components/Logo";
import { SlimLayout } from "@/components/SlimLayout";
import { ImageUpload } from "@/components/ImageUpload";

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
      <form
        action="#"
        className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        <TextField
          label="First name"
          name="first_name"
          type="text"
          autoComplete="given-name"
          required
        />
        <TextField
          label="Last name"
          name="last_name"
          type="text"
          autoComplete="family-name"
          required
        />
        <TextField
          className="col-span-full"
          label="Company name"
          name="company_name"
          type="text"
          autoComplete="company-name"
          required
        />
        <ImageUpload label="Company logo" />
        <TextField
          className="col-span-full"
          label="Sender email address"
          name="sender_email"
          type="email"
          autoComplete="email"
          required
        />
        <TextField
          className="col-span-full"
          label="Reply to email address"
          name="reply_to_email"
          type="email"
          autoComplete="email"
          required
        />
        <div className="col-span-full mt-4">
          <Button type="submit" variant="solid" color="blue" className="w-full">
            <span>
              Sign up <span aria-hidden="true">&rarr;</span>
            </span>
          </Button>
        </div>
      </form>
    </SlimLayout>
  );
}
