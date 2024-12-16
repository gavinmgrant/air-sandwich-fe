"use client";

import { useState, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button } from "@/components/Button";
import { TextField } from "@/components/Fields";
import { ImageUpload } from "@/components/ImageUpload";
import { swrPoster } from "@/utils/swrUtils";
import { EventFormData } from "@/types";

interface EventFormProps {
  onClose: () => void;
  activeEvent?: EventFormData;
}

export default function EventForm({ onClose, activeEvent }: EventFormProps) {
  const { register, handleSubmit, reset, control } = useForm<EventFormData>();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (activeEvent) {
      reset(activeEvent); // Reset the form with the active event data
    }
  }, [activeEvent, reset]);

  const submitEventInfo = async (data: EventFormData) => {
    setIsLoading(true);
    await swrPoster("/events/", data);
    setIsLoading(false);
  };

  const onSubmit: SubmitHandler<EventFormData> = async (data) => {
    await submitEventInfo(data);
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
    >
      <TextField
        className="col-span-full"
        label="Name"
        type="text"
        {...register("eventName")}
      />
      <TextField
        className="col-span-full"
        label="Description"
        type="text"
        {...register("eventDescription")}
      />
      <TextField label="Date" type="date" {...register("eventDate")} />
      <TextField label="Time" type="time" {...register("eventTime")} />
      <TextField
        className="col-span-full"
        label="RSVP Link"
        type="text"
        {...register("eventRsvpLink")}
      />
      <Controller
        name="eventImage"
        control={control}
        render={({ field }) => (
          <ImageUpload
            label="Event image"
            isUser={false}
            smallPreview={false}
            value={field.value ? new File([field.value], "eventImage") : null}
            onChange={(file) => {
              field.onChange(file);
            }}
          />
        )}
      />
      <div className="col-span-full mt-4">
        <Button
          type="submit"
          variant="solid"
          color="blue"
          className="w-full"
          isLoading={isLoading}
        >
          <span>Save</span>
        </Button>
      </div>
    </form>
  );
}
