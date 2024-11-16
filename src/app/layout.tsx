import { type Metadata } from "next";
import { Inter, Lexend } from "next/font/google";
import { ThemeProvider } from "next-themes";
import clsx from "clsx";

import "@/styles/tailwind.css";

export const metadata: Metadata = {
  title: {
    template: "%s - AirSandwich",
    default:
      "AirSandwich - Newsletters for financial advisors to send to clients",
  },
  description:
    "AirSandwich is a newsletter service for financial advisors to send to clients.",
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lexend",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={clsx(
        "h-full scroll-smooth antialiased",
        inter.variable,
        lexend.variable,
      )}
      suppressHydrationWarning
    >
      <body className="flex h-full flex-col bg-white dark:bg-gray-900 dark:text-white">
        <ThemeProvider attribute="class" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
