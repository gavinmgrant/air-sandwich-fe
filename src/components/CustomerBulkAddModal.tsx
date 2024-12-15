import { useState, useRef } from "react";
import readXlsxFile from "read-excel-file";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/Button";
import { swrPoster } from "@/utils/swrUtils";
import { CustomerFormData } from "@/types";

interface CustomerModalProps {
  title: string;
  open: boolean;
  onClose: () => void;
}

export function CustomerBulkAddModal({
  title,
  open,
  onClose,
}: CustomerModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [customerRows, setCustomerRows] = useState<any[][]>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = () => {
    const input = inputRef.current;
    if (input && input.files && input.files[0]) {
      readXlsxFile(input.files[0]).then((rows) => {
        setCustomerRows(rows);
      });
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);
    customerRows.forEach((row, index) => {
      const data: CustomerFormData = {
        firstName: row[0] as string,
        lastName: row[1] as string,
        phone: row[2] as string,
        email: row[3] as string,
        address: row[4] as string,
        isRetired: false,
        workPlace: row[5] as string,
      };
      if (index !== 0) swrPoster("/customers/", data);
    });
    setIsLoading(false);
    onClose();
  };

  return (
    <Modal title={title} open={open} onClose={onClose}>
      <div className="text-sm mt-6">
        <p>Select an xlsx file to upload your customer data.</p>
        <a href="/bulk-add-template.xlsx" download>
          Download our template xlsx file here.
        </a>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          className="my-4 mb-5 w-full cursor-pointer p-1 text-sm file:mr-2 file:cursor-pointer file:rounded-md file:border-none file:bg-gray-50 file:px-3 file:py-2 file:ring-1 file:ring-gray-200 dark:file:bg-slate-800"
          type="file"
          ref={inputRef} // Attach the ref to the input element
          onChange={handleFileChange} // Use the handler directly
        />
        <div className="col-span-full">
          <Button
            type="submit"
            variant="solid"
            color="blue"
            className="w-full"
            isLoading={isLoading}
            disabled={isLoading || customerRows.length === 0}
          >
            <span>Save</span>
          </Button>
        </div>
      </form>
    </Modal>
  );
}
