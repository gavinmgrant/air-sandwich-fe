import { Modal } from "@/components/Modal";
import EventForm from "@/components/EventForm";
import { EventFormData } from "@/types";

interface EventModalProps {
  title: string;
  open: boolean;
  onClose: () => void;
  activeEvent?: EventFormData;
}

export function EventModal({
  title,
  open,
  onClose,
  activeEvent,
}: EventModalProps) {
  return (
    <Modal title={title} open={open} onClose={onClose}>
      <EventForm onClose={onClose} activeEvent={activeEvent} />
    </Modal>
  );
}
