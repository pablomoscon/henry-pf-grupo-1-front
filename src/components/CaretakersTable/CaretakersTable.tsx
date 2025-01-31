import { UserData } from "@/interfaces/IUser";
import { FaEdit, FaTrash } from "react-icons/fa";

interface CaretakersTableProps {
  caretakers: UserData[];
  onEdit: (caretaker: UserData) => void;
  onDelete: (id: string) => void;
}

export const CaretakersTable = ({
  caretakers,
  onEdit,
  onDelete,
}: CaretakersTableProps) => {
  return (
    <div className="w-full">
      <table className="w-full table-fixed">
        <thead>
          <tr className="border-b border-gold-soft">
            <th className="px-2 py-2 text-left text-gold-soft text-sm w-[20%]">
              Email
            </th>
            <th className="px-2 py-2 text-left text-gold-soft text-sm w-[15%]">
              Full Name
            </th>
            <th className="px-2 py-2 text-left text-gold-soft text-sm w-[15%]">
              Phone
            </th>
            <th className="px-2 py-2 text-left text-gold-soft text-sm w-[25%]">
              Address
            </th>
            <th className="px-2 py-2 text-left text-gold-soft text-sm w-[15%]">
              Customer ID
            </th>
            <th className="px-2 py-2 text-left text-gold-soft text-sm w-[10%]">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {caretakers.map((caretaker) => (
            <tr
              key={caretaker.id}
              className="border-b border-gray-700 hover:bg-black-light"
            >
              <td className="px-2 py-2 text-white-ivory text-sm truncate">
                {caretaker.email}
              </td>
              <td className="px-2 py-2 text-white-ivory text-sm truncate">
                {caretaker.name}
              </td>
              <td className="px-2 py-2 text-white-ivory text-sm truncate">
                {caretaker.phone}
              </td>
              <td className="px-2 py-2 text-white-ivory text-sm truncate">
                {caretaker.address}
              </td>
              <td className="px-2 py-2 text-white-ivory text-sm truncate">
                {caretaker.customerId}
              </td>
              <td className="px-2 py-2">
                <div className="flex gap-1">
                  <button
                    onClick={() => onEdit(caretaker)}
                    className="text-gold-soft hover:text-gold-hover"
                    title="Edit"
                  >
                    <FaEdit size={16} />
                  </button>

                  <button
                    onClick={() => onDelete(caretaker.id)}
                    className="text-red-500 hover:text-red-600"
                    title="Delete"
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {caretakers.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="px-4 py-2 text-center text-white-ivory"
              >
                No caretakers registered
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
