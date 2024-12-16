"use client";

import isAuth from "@/components/isAuth";
import { Dashboard } from "@/components/Dashboard";
import { EventsList } from "@/components/EventsList";

const DashboardEvents = () => {
  return (
    <>
      <Dashboard>
        <EventsList />
      </Dashboard>
    </>
  );
};

export default isAuth(DashboardEvents);
