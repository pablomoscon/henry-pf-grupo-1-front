import { UserRegister } from "@/interfaces/IUser";

interface CaretakerFormProps {
  currentCaretaker: UserRegister & { id?: string };
  editionMode: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  onChange: (field: string, value: string) => void;
}

export const CaretakerForm = ({
  currentCaretaker,
  editionMode,
  onSubmit,
  onCancel,
  onChange,
}: CaretakerFormProps) => {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center bg-black-dark">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-2xl mx-auto p-6 rounded-lg shadow-md space-y-3"
        style={{ background: "var(--black-dark)" }}
      >
        <h2 className="text-2xl mb-4" style={{ color: "var(--gold-soft)" }}>
          {editionMode ? "Edit" : "Create"} Caretaker
        </h2>

        <div className="space-y-3">
          {[
            { id: "email", type: "email", label: "Email", required: true },
            {
              id: "password",
              type: "password",
              label: "Password",
              required: !editionMode,
            },
            {
              id: "confirmPassword",
              type: "password",
              label: "Confirm Password",
              required: !editionMode,
            },
            { id: "name", type: "text", label: "Name", required: true },
            { id: "phone", type: "tel", label: "Phone", required: true },
            { id: "address", type: "text", label: "Address", required: true },
            {
              id: "customerId",
              type: "text",
              label: "Customer ID",
              required: true,
            },
          ].map(({ id, type, label, required }) => (
            <div key={id}>
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
                value={currentCaretaker[id as keyof typeof currentCaretaker]}
                onChange={(e) => onChange(id, e.target.value)}
                required={required}
                className="mt-1 block w-full rounded-md border p-2 border-gray-600 focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: "var(--black-light)",
                  color: "var(--white-basic)",
                }}
              />
            </div>
          ))}
        </div>

        <div className="flex gap-2 mt-4">
          <button
            type="submit"
            className="button_gold py-2.5 px-4 rounded text-lg"
          >
            {editionMode ? "Update" : "Create"} Caretaker
          </button>
          {editionMode && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-black-light text-white-ivory px-4 py-2.5 rounded hover:bg-opacity-80 text-lg"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
