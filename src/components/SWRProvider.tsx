"use client";

import { SWRConfig } from "swr";
import { swrFetcher } from "@/utils/swrFetcher";

export default function SWRProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SWRConfig
      value={{
        provider: () => new Map(),
        fetcher: swrFetcher,
        dedupingInterval: 2000,
        onError: (err) => {
          console.error("SWR Error:", err);
        },
      }}
    >
      {children}
    </SWRConfig>
  );
}
