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
      <div className="bg-black-dark p-6 rounded-lg text-white-ivory">
        <h3
          className="text-lg font-bold mb-4"
          style={{ color: "var(--gold-soft)" }}
        >
          {title}
        </h3>
        <p>{message}</p>
        <div className="mt-4 flex gap-2">
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Eliminar
          </button>
          <button
            onClick={onClose}
            className="bg-black-light text-white-ivory px-4 py-2 rounded hover:bg-opacity-80"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
