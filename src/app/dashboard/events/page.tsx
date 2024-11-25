"use client";

import isAuth from "@/components/isAuth";
import { Dashboard } from "@/components/Dashboard";

const DashboardEvents = () => {
  return (
    <>
      <Dashboard>
        <div>Events</div>
      </Dashboard>
    </>
  );
};

export default isAuth(DashboardEvents);
