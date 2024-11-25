"use client";

import isAuth from "@/components/isAuth";
import { Dashboard } from "@/components/Dashboard";
import exp from "constants";

const DashboardProfile = () => {
  return (
    <>
      <Dashboard>
        <div>Profile</div>
      </Dashboard>
    </>
  );
}

export default isAuth(DashboardProfile);
