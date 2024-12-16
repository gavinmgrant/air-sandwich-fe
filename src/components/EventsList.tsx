"use client";

import { useState, useEffect, use } from "react";
import { formatPhoneNumber } from "@/utils/formatNumbers";
import { Button } from "@/components/Button";
import { EventModal } from "@/components/EventModal";
import { Loader } from "@/components/Loader";
import { EventFormData } from "@/types";
import { swrPoster } from "@/utils/swrUtils";

export function EventsList() {
  const [events, setEvents] = useState<EventFormData[]>([]);
  const [activeEvent, setActiveEvent] = useState<EventFormData>();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const fetchEvents = async () => {
    let req = await swrPoster("/events/all", {});
    const fetchedEvents: EventFormData[] = req.content;
    setEvents(fetchedEvents);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleAddEvent = () => {
    setActiveEvent(undefined);
    setModalTitle("Add event");
    setModalOpen(true);
  };

  const handleEditEvent = (index: number) => {
    setActiveEvent(events[index]);
    setModalTitle("Edit event");
    setModalOpen(true);
  };

  const handleModalClose = () => {
    fetchEvents();
    setModalOpen(false);
  };

  return (
    <>
      <EventModal
        title={modalTitle}
        open={modalOpen}
        onClose={handleModalClose}
        activeEvent={activeEvent}
      />

      <div>
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold">Events</h1>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              These are your events that will be added to your newsletter.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <Button color="blue" onClick={handleAddEvent}>
              Add event
            </Button>
          </div>
        </div>

        {!events.length ? (
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
                        <h3 className="group inline-flex">Name</h3>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-semibold sm:pl-0"
                      >
                        <h3 className="group inline-flex">Date</h3>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-semibold sm:pl-0"
                      >
                        <h3 className="group inline-flex">Time</h3>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-semibold sm:pl-0"
                      >
                        <h3 className="group inline-flex">RSVP Link</h3>
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-0">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {events.map((event, index) => (
                      <tr key={event.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-0">
                          {event.eventName}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-0">
                          {event.eventDate}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-0">
                          {event.eventTime}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-0">
                          {event.eventRsvpLink}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm sm:pr-0">
                          <a onClick={() => handleEditEvent(index)}>
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
