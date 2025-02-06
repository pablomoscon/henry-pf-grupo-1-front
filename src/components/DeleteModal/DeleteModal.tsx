interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export const DeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}: DeleteModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-black-dark p-6 rounded-lg text-white-ivory justify-center">
        <h3
          className="text-lg mb-4 justify-center"
          style={{ color: "var(--gold-soft)" }}
        >
          {title}
        </h3>
        <p className="justify-center">{message}</p>
        <div className="mt-4 flex justify-center gap-2">
          <button
            onClick={onConfirm}
            className="bg-green-dark text-white px-4 py-2 rounded hover:bg-green-olive"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="bg-black-light text-white-ivory px-4 py-2 rounded hover:bg-opacity-80"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
