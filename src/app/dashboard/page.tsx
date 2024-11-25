"use client";

import isAuth from "@/components/isAuth";
import { Dashboard } from "@/components/Dashboard";

const DashboardLanding = () => {
  return (
    <>
      <Dashboard>
        <div>Dashboard</div>
      </Dashboard>
    </>
  );
}

export default isAuth(DashboardLanding);
