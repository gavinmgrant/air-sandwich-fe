"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const [auth, setAuth] = useState<boolean | null>(null);

    useEffect(() => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const isAuthenticated = !!accessToken && !!refreshToken;

      setAuth(isAuthenticated);

      if (!isAuthenticated) {
        redirect("/");
      }
    }, []);

    // Render nothing while checking authentication
    if (auth === null) {
      return null;
    }

    // Render the component if authenticated
    return <Component {...props} />;
  };
}
