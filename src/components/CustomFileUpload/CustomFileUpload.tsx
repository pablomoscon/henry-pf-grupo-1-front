import React, { useRef } from "react";

interface CustomFileUploadProps {
  onFileSelect: (file: File) => void;
  error?: string;
  touched?: boolean;
  label: string;
}

const CustomFileUpload: React.FC<CustomFileUploadProps> = ({
  onFileSelect,
  error,
  touched,
  label = "Upload Image",
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div>
      <label
        className="block text-sm font-medium mb-1"
        style={{ color: "var(--white-ivory)" }}
      >
        {label}
      </label>
      <div className="relative">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        <button
          type="button"
          onClick={handleClick}
          className={`w-full px-4 py-2 text-left rounded-md border ${
            error && touched ? "border-red-500" : "border-gray-600"
          } focus:outline-none focus:ring-2`}
          style={{
            backgroundColor: "var(--black-light)",
            color: "var(--white-basic)",
          }}
        >
          Choose file
        </button>
      </div>
      {error && touched && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default CustomFileUpload;
