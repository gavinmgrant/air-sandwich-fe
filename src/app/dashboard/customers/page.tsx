import { Dashboard } from "@/components/Dashboard";
import { CustomersList } from "@/components/CustomersList";

export default function DashboardCustomers() {
  return (
    <>
      <Dashboard>
        <CustomersList />
      </Dashboard>
    </>
  );
}