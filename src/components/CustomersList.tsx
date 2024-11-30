"use client";

import { useState } from "react";
// import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { formatPhoneNumber } from "@/utils/formatNumbers";
import { Button } from "@/components/Button";
import { CustomerModal } from "@/components/CustomerModal";

const people = [
  {
    firstName: "Lindsay",
    lastName: "Walton",
    phone: "55532423451",
    email: "lindsay.walton@example.com",
    isRetired: true,
  },
  {
    firstName: "Emily",
    lastName: "Selman",
    phone: "55532423451",
    email: "emily.selman@example.com",
    isRetired: true,
  },
  {
    firstName: "Kristin",
    lastName: "Watson",
    phone: "55532423451",
    email: "kristin.watson@example.com",
    isRetired: false,
  },
];

export function CustomersList() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const handleAddCustomer = () => {
    setModalTitle("Add customer");
    setModalOpen(true);
  };
  const handleEditCustomer = () => {
    setModalTitle("Edit customer");
    setModalOpen(true);
  };

  return (
    <>
      <CustomerModal
        title={modalTitle}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
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
              <Button color="slate" variant="outline">
                Bulk add
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="font-semibol py-3.5 pl-4 pr-3 text-left text-sm sm:pl-0"
                    >
                      <h3 className="group inline-flex">
                        First Name
                        {/* <span className="ml-2 flex-none rounded bg-gray-100 text-gray-900 group-hover:bg-gray-200">
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="size-5"
                        />
                      </span> */}
                      </h3>
                    </th>
                    <th
                      scope="col"
                      className="font-semibol py-3.5 pl-4 pr-3 text-left text-sm sm:pl-0"
                    >
                      <h3 className="group inline-flex">
                        Last Name
                        {/* <span className="ml-2 flex-none rounded bg-gray-100 text-gray-900 group-hover:bg-gray-200">
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="size-5"
                        />
                      </span> */}
                      </h3>
                    </th>
                    <th
                      scope="col"
                      className="font-semibol py-3.5 pl-4 pr-3 text-left text-sm sm:pl-0"
                    >
                      <h3 className="group inline-flex">Phone</h3>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold"
                    >
                      <h3 className="group inline-flex">
                        Email
                        {/* <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                          <ChevronDownIcon
                            aria-hidden="true"
                            className="invisible ml-2 size-5 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"
                          />
                        </span> */}
                      </h3>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold"
                    >
                      <h3 className="group inline-flex">Retired?</h3>
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-0">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {people.map((person) => (
                    <tr key={person.email}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-0">
                        {person.firstName}
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-0">
                        {person.lastName}
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-0">
                        {formatPhoneNumber(person.phone)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        {person.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        {person.isRetired ? "Yes" : "No"}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm sm:pr-0">
                        <a onClick={handleEditCustomer}>
                          Edit<span className="sr-only">, {person.name}</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
