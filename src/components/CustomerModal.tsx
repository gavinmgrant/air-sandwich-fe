import { Modal } from "@/components/Modal";

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
      <div>Customer Modal Content</div>
    </Modal>
  );
}
