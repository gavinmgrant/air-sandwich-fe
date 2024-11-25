"use client";

import isAuth from "@/components/isAuth";
import { Dashboard } from "@/components/Dashboard";
import { CustomersList } from "@/components/CustomersList";

const DashboardCustomers = () => {
  return (
    <>
      <Dashboard>
        <CustomersList />
      </Dashboard>
    </>
  );
}

export default isAuth(DashboardCustomers);
