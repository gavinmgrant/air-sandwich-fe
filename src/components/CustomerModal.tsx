import { Modal } from "@/components/Modal";
import CustomerForm from "@/components/CustomerForm";
import { CustomerFormData } from "@/types";

interface CustomerModalProps {
  title: string;
  open: boolean;
  onClose: () => void;
  activeCustomer?: CustomerFormData;  
}

export function CustomerModal({ title, open, onClose, activeCustomer }: CustomerModalProps) {

  return (
    <Modal
      title={title}
      open={open}
      onClose={onClose}
    >
      <CustomerForm onClose={onClose} activeCustomer={activeCustomer} />
    </Modal>
  );
}
