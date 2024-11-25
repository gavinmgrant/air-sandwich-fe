"use client";

import isAuth from "@/components/isAuth";
import { Dashboard } from "@/components/Dashboard";

const DashboardEmails = () => {
  return (
    <>
      <Dashboard>
        <div>Emails</div>
      </Dashboard>
    </>
  );
};

export default isAuth(DashboardEmails);
