"use client";

import { useId } from "react";
import { Switch } from "@headlessui/react";
import { Label } from "@/components/Fields";

type ToggleProps = {
  label?: string;
  text?: string;
  value?: boolean;
  onChange?: (value: boolean) => void;
};

export function Toggle({ label, text, value, onChange }: ToggleProps) {
  const id = useId();

  const handleToggle = () => {
    if (onChange) {
      onChange(!value);
    }
  };

  return (
    <div className="flex flex-col items-start">
      {label && <Label id={id}>{label}</Label>}
      <div className="flex items-center gap-4">
        <Switch
          checked={value}
          onChange={handleToggle}
          className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 data-[checked]:bg-blue-600 dark:bg-slate-700 dark:data-[checked]:bg-slate-400"
        >
          <span className="sr-only">Use toggle</span>
          <span
            aria-hidden="true"
            className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
          />
        </Switch>
        {text && <p className="text-sm">{text}</p>}
      </div>
    </div>
  );
}
