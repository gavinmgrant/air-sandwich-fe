"use client";

import isAuth from "@/components/isAuth";
import { Dashboard } from "@/components/Dashboard";

const DashboardPosts = () => {
  return (
    <>
      <Dashboard>
        <div>Settings</div>
      </Dashboard>
    </>
  );
};

export default isAuth(DashboardPosts);
