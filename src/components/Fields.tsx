import { forwardRef, useId } from "react";
import clsx from "clsx";

const formClasses =
  "block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 dark:bg-slate-800 px-3 py-2 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-blue-500 sm:text-sm";

export function Label({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={id}
      className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      {children}
    </label>
  );
}

export const TextField = forwardRef<
  HTMLInputElement,
  Omit<React.ComponentPropsWithoutRef<"input">, "id"> & { label: string }
>(({ label, type = "text", className, ...props }, ref) => {
  const id = useId();

  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <input ref={ref} id={id} type={type} {...props} className={formClasses} />
    </div>
  );
});

TextField.displayName = "TextField";

export const SelectField = forwardRef<
  HTMLSelectElement,
  Omit<React.ComponentPropsWithoutRef<"select">, "id"> & { label: string }
>(({ label, className, ...props }, ref) => {
  const id = useId();

  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <select
        ref={ref}
        id={id}
        {...props}
        className={clsx(formClasses, "pr-8")}
      />
    </div>
  );
});

SelectField.displayName = "SelectField";
