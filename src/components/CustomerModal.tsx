import { Modal } from "@/components/Modal";
import CustomerForm from "@/components/CustomerForm";

interface CustomerModalProps {
  title: string;
  open: boolean;
  onClose: () => void;
}

export function CustomerModal({ title, open, onClose }: CustomerModalProps) {

  return (
    <Modal
      title={title}
      open={open}
      onClose={onClose}
    >
      <CustomerForm onClose={onClose} />
    </Modal>
  );
}
