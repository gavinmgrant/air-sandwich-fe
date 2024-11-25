import Link from "next/link";
import clsx from "clsx";

import { ArrowPathIcon } from "@heroicons/react/24/outline";

const baseStyles = {
  solid:
    "group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2",
  outline:
    "group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none",
};

const variantStyles = {
  solid: {
    slate:
      "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-700 dark:hover:bg-slate-300 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900",
    blue: "bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600 dark:text-white dark:hover:text-white",
    white:
      "bg-white text-slate-900 dark:hover:text-slate-700 dark:text-slate-900 hover:bg-blue-50 active:bg-blue-200 active:text-slate-600 focus-visible:outline-white",
    black:
      "bg-black dark:hover:bg-slate-200 hover:text-white dark:bg-white dark:text-slate-900 dark:hover:text-slate-900 text-white hover:bg-gray-900 active:bg-gray-800 focus-visible:outline-black",
  },
  outline: {
    slate:
      "ring-slate-200 text-slate-700 dark:text-slate-300 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 dark:active:bg-slate-800 dark:active:text-slate-300 focus-visible:outline-blue-600 focus-visible:ring-slate-300",
    white:
      "ring-slate-700 text-white hover:ring-slate-500 active:ring-slate-700 active:text-slate-400 focus-visible:outline-white",
  },
};

type ButtonProps = (
  | {
      variant?: "solid";
      color?: keyof typeof variantStyles.solid;
    }
  | {
      variant: "outline";
      color?: keyof typeof variantStyles.outline;
    }
) &
  (
    | Omit<React.ComponentPropsWithoutRef<typeof Link>, "color">
    | (Omit<React.ComponentPropsWithoutRef<"button">, "color"> & {
        href?: undefined;
      })
  ) & {
    isLoading?: boolean;
  };

export function Button({
  className,
  isLoading,
  children,
  ...props
}: ButtonProps) {
  props.variant ??= "solid";
  props.color ??= "slate";

  className = clsx(
    baseStyles[props.variant],
    props.variant === "outline"
      ? variantStyles.outline[props.color]
      : props.variant === "solid"
        ? variantStyles.solid[props.color]
        : undefined,
    className,
  );

  const Loader = () => {
    return <ArrowPathIcon className="h-6 w-6 animate-spin" />;
  };

  return typeof props.href === "undefined" ? (
    <button className={className} {...props}>
      {isLoading ? <Loader /> : children}
    </button>
  ) : (
    <Link className={className} {...props}>
      {isLoading ? <Loader /> : children}
    </Link>
  );
}
