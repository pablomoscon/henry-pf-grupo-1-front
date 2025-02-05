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
        <p className="text-white-basic text-xl text-center mb-10">
          Selecciona tu Photo / Video
        </p>
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg, video/mp4, video/avi, video/mov"
          onChange={handleFileChange}
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full rounded-lg mt-4 mb-4"
          />
        )}
        <button
          className="bg-green-dark text-white px-4 py-2 rounded-lg w-full mt-4"
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
