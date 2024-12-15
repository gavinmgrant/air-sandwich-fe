"use client";

import { useState, useEffect, use } from "react";
import { formatPhoneNumber } from "@/utils/formatNumbers";
import { Button } from "@/components/Button";
import { CustomerModal } from "@/components/CustomerModal";
import { CustomerBulkAddModal } from "@/components/CustomerBulkAddModal";
import { Loader } from "@/components/Loader";
import { CustomerFormData } from "@/types";
import { swrPoster } from "@/utils/swrUtils";

export function CustomersList() {
  const [customers, setCustomers] = useState<CustomerFormData[]>([]);
  const [activeCustomer, setActiveCustomer] = useState<CustomerFormData>();
  const [modalOpen, setModalOpen] = useState(false);
  const [bulkUploadModalOpen, setBulkUploadModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const fetchCustomers = async () => {
    let req = await swrPoster("/customers/all", {});
    const fetchedCustomers: CustomerFormData[] = req.content;
    setCustomers(fetchedCustomers);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleAddCustomer = () => {
    setActiveCustomer(undefined);
    setModalTitle("Add customer");
    setModalOpen(true);
  };

  const handleEditCustomer = (index: number) => {
    setActiveCustomer(customers[index]);
    setModalTitle("Edit customer");
    setModalOpen(true);
  };

  const handleModalClose = () => {
    fetchCustomers();
    setModalOpen(false);
    setBulkUploadModalOpen(false);
  };

  const handleBulkAdd = () => {
    setBulkUploadModalOpen(true);
  };

  return (
    <>
      <CustomerModal
        title={modalTitle}
        open={modalOpen}
        onClose={handleModalClose}
        activeCustomer={activeCustomer}
      />
      
      <CustomerBulkAddModal
        title="Bulk upload customers"
        open={bulkUploadModalOpen}
        onClose={handleModalClose}
      />

      <div>
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold">Customers</h1>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              These are all of the customers that have signed up for your
              service.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <div className="item flex gap-2">
              <Button color="blue" onClick={handleAddCustomer}>
                Add customer
              </Button>
              <Button color="slate" variant="outline" onClick={handleBulkAdd}>
                Bulk add
              </Button>
            </div>
          </div>
        </div>

        {!customers.length ? (
          <div className="flex h-64 w-full items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-semibold sm:pl-0"
                      >
                        <h3 className="group inline-flex">First Name</h3>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-semibold sm:pl-0"
                      >
                        <h3 className="group inline-flex">Last Name</h3>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-semibold sm:pl-0"
                      >
                        <h3 className="group inline-flex">Phone</h3>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-semibold sm:pl-0"
                      >
                        <h3 className="group inline-flex">Email</h3>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-semibold sm:pl-0"
                      >
                        <h3 className="group inline-flex">Address</h3>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-semibold sm:pl-0"
                      >
                        <h3 className="group inline-flex">Retired?</h3>
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-0">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {customers.map((customer, index) => (
                      <tr key={customer.email}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-0">
                          {customer.firstName}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-0">
                          {customer.lastName}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-0">
                          {formatPhoneNumber(customer.phone)}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-0">
                          {customer.email}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-0">
                          {customer.address}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-0">
                          {customer.isRetired ? "Yes" : "No"}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm sm:pr-0">
                          <a onClick={() => handleEditCustomer(index)}>
                            <Button color="slate" variant="outline">
                              Edit
                            </Button>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
