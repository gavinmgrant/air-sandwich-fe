import Image from "next/image";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";

export function CallToAction() {
  return (
    <section
      id="get-started-today"
      className="relative overflow-hidden bg-blue-600 py-32"
    >
      <Container className="relative">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            Get started today
          </h2>
          <p className="mt-4 text-lg tracking-tight text-white">
            It’s time to automate your newsletters for clients to leverage your
            time and grow your business.
          </p>
          <Button href="/login" color="white" className="mt-10">
            Sign up
          </Button>
        </div>
      </Container>
    </section>
  );
}
