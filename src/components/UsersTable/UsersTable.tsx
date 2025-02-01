import { UserData } from "@/interfaces/IUser";
import { FaEdit, FaTrash } from "react-icons/fa";

interface UsersTableProps {
  users: UserData[];
  onEdit: (user: UserData) => void;
  onDelete: (id: string) => void;
}

export const UsersTable = ({ users, onEdit, onDelete }: UsersTableProps) => {
  return (
    <div className="w-full">
      <table className="w-full table-fixed">
        <thead>
          <tr className="border-b border-gold-soft">
            <th className="px-2 py-2 text-left text-gold-soft text-sm w-[25%]">
              Email
            </th>
            <th className="px-2 py-2 text-left text-gold-soft text-sm w-[20%]">
              Full Name
            </th>
            <th className="px-2 py-2 text-left text-gold-soft text-sm w-[15%]">
              Phone
            </th>
            <th className="px-2 py-2 text-left text-gold-soft text-sm w-[30%]">
              Address
            </th>
            <th className="px-2 py-2 text-left text-gold-soft text-sm w-[10%]">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b border-gray-700 hover:bg-black-light"
            >
              <td className="px-2 py-2 text-white-ivory text-sm truncate">
                {user.email}
              </td>
              <td className="px-2 py-2 text-white-ivory text-sm truncate">
                {user.name}
              </td>
              <td className="px-2 py-2 text-white-ivory text-sm truncate">
                {user.phone}
              </td>
              <td className="px-2 py-2 text-white-ivory text-sm truncate">
                {user.address}
              </td>
              <td className="px-2 py-2 text-white-ivory text-sm truncate">
                {user.customerId}
              </td>
              <td className="px-2 py-2">
                <div className="flex gap-1">
                  <button
                    onClick={() => onEdit(user)}
                    className="text-gold-soft hover:text-gold-hover"
                    title="Edit"
                  >
                    <FaEdit size={16} />
                  </button>

                  <button
                    onClick={() => onDelete(user.id)}
                    className="text-red-500 hover:text-red-600"
                    title="Delete"
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="px-4 py-2 text-center text-white-ivory"
              >
                No users registered
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
