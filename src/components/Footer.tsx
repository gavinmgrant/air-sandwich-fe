import Link from "next/link";

import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";
import { NavLink } from "@/components/NavLink";

export function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-900">
      <Container>
        <div className="py-16">
          <Logo className="mx-auto h-6 w-auto" />
          <nav className="mt-10 text-sm" aria-label="quick links">
            <div className="-my-1 flex justify-center gap-x-6">
              <NavLink href="#features">Features</NavLink>
              <NavLink href="#testimonials">Testimonials</NavLink>
              <NavLink href="#pricing">Pricing</NavLink>
            </div>
          </nav>
        </div>
        <div className="border-t border-slate-400/10 py-10 text-center sm:text-left">
          <p className="mt-6 text-sm text-slate-500 dark:text-slate-300 sm:mt-0">
            Copyright &copy; {new Date().getFullYear()} AirSandwich. All rights
            reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
