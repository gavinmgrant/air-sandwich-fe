"use client";

import { isAuthenticated } from "@/utils/auth";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const auth = isAuthenticated();

    useEffect(() => {
      if (!auth) {
        return redirect("/");
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!auth) {
      return null;
    }

    return <Component {...props} />;
  };
}
