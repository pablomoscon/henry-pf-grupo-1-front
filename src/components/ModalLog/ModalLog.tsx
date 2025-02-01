import { useState } from "react";

interface ModalProps {
  onClose: () => void;
  onConfirm: (file: File | null) => void;
}

const Modal = ({ onClose, onConfirm }: ModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      if (file.type.startsWith("image")) {
        setPreview(URL.createObjectURL(file));
      } else {
        setPreview(null);
      }
    }
  };

  const handleConfirm = () => {
    onConfirm(selectedFile);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-black-dark p-6 rounded-lg shadow-lg w-96 relative">
        <button
          className="absolute top-2 right-2 text-white-basic"
          onClick={onClose}
        >
          ✖
        </button>
        <h2 className="text-white-basic text-center mb-4">
          Selecciona tu Photo / Video
        </h2>
        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          className="w-full mb-4"
        />
        {preview && (
          <img src={preview} alt="Preview" className="w-full rounded-lg mb-4" />
        )}
        <button
          className="bg-green-dark text-white px-4 py-2 rounded-lg w-full"
          onClick={handleConfirm}
          disabled={!selectedFile}
        >
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default Modal;
