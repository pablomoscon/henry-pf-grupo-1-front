import { FormEvent, useState } from "react";

export interface UserFormData {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  phone: string;
  customerId: string;
  address: string;
}

interface UserFormProps {
  onSubmit: (userData: UserFormData) => void;
}

export const UserForm = ({ onSubmit }: UserFormProps) => {
  const [currentUser, setCurrentUser] = useState<UserFormData>({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    phone: "",
    customerId: "",
    address: "",
  });
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (currentUser.password !== currentUser.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    onSubmit(currentUser);
    setShowConfirm(false);
    setCurrentUser({
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
      phone: "",
      customerId: "",
      address: "",
    });
  };

  const handleChange = (id: string, value: string) => {
    setCurrentUser((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="py-2 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl mx-auto rounded-lg shadow-md space-y-2"
        style={{ background: "var(--black-dark)" }}
      >
        <h2 className="text-xl" style={{ color: "var(--gold-soft)" }}>
          Create User
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {[
            { id: "email", type: "email", label: "Email", required: true },
            { id: "name", type: "text", label: "Name", required: true },
            {
              id: "password",
              type: "password",
              label: "Password",
              required: true,
              colSpan: true,
            },
            {
              id: "confirmPassword",
              type: "password",
              label: "Confirm Password",
              required: true,
              colSpan: true,
            },
            { id: "phone", type: "tel", label: "Phone", required: true },
            {
              id: "customerId",
              type: "text",
              label: "Customer ID",
              required: true,
            },
            {
              id: "address",
              type: "text",
              label: "Address",
              required: true,
              colSpan: true,
            },
          ].map(({ id, type, label, required, colSpan }) => (
            <div key={id} className={colSpan ? "col-span-2" : ""}>
              <label
                htmlFor={id}
                className="block text-sm font-medium mb-1"
                style={{ color: "var(--white-ivory)" }}
              >
                {label}
              </label>
              <input
                id={id}
                type={type}
                value={currentUser[id as keyof typeof currentUser]}
                onChange={(e) => handleChange(id, e.target.value)}
                required={required}
                className="w-full rounded-md border p-1.5 border-gray-600 focus:outline-none focus:ring-1"
                style={{
                  backgroundColor: "var(--black-light)",
                  color: "var(--white-basic)",
                }}
              />
            </div>
          ))}
        </div>

        <div className="flex gap-2 mt-3">
          <button
            type="submit"
            className="button_gold py-2 px-4 rounded text-base"
          >
            Create User
          </button>
        </div>
      </form>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-black-dark rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg text-gold-soft mb-4">Confirm Creation</h3>
            <p className="text-white-ivory mb-6">
              Are you sure you want to create the user &ldquo;{currentUser.name}
              &rdquo;?
            </p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={handleConfirm}
                className="button_gold py-2 px-4 rounded text-base"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-black-light text-white-ivory px-4 py-2 rounded hover:bg-opacity-80 text-base"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
