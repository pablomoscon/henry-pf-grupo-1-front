import { IRoom } from "@/interfaces/IRoom";
import { FaEdit, FaTrash } from "react-icons/fa";
import Image from "next/image";
import { useState } from "react";

interface SuitesTableProps {
  suites: IRoom[];
  onEdit: (suite: IRoom) => void;
  setSuiteToDelete: (suite: IRoom | null) => void;
  setShowConfirmDelete: (show: boolean) => void;
}

export const SuitesTable = ({
  suites,
  onEdit,
  setSuiteToDelete,
  setShowConfirmDelete,
}: SuitesTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState<"name" | "price" | "cats">("name");

  const filteredSuites = suites.filter((suite) => {
    const searchLower = searchTerm.toLowerCase();
    switch (filterBy) {
      case "name":
        return suite.name.toLowerCase().includes(searchLower);
      case "price":
        return suite.price.toString().includes(searchTerm);
      case "cats":
        return suite.number_of_cats.toString().includes(searchTerm);
      default:
        return true;
    }
  });

  return (
    <div className="max-w-2xl mx-auto">
      <div className="w-full rounded-lg border border-gray-700 bg-black-dark">
        <div className="p-4">
          <div className="flex gap-2 mb-4">
            <select
              value={filterBy}
              onChange={(e) =>
                setFilterBy(e.target.value as "name" | "price" | "cats")
              }
              className="p-2 rounded bg-black-light text-white-ivory border border-gray-700 focus:outline-none focus:border-gold-soft"
            >
              <option value="name">Nombre</option>
              <option value="price">Precio</option>
              <option value="cats">Cantidad de gatos</option>
            </select>
            <input
              type="text"
              placeholder={
                filterBy === "name"
                  ? "Search by name..."
                  : filterBy === "price"
                  ? "Search by price..."
                  : "Search by number of cats..."
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 rounded bg-white text-black placeholder-gray-500 border border-gray-700 focus:outline-none focus:border-gold-soft"
            />
          </div>
        </div>
        <table className="w-full table-fixed">
          <thead>
            <tr className="border-b border-gray-700 bg-black-light">
              <th className="w-[5%] px-0.5 py-2 text-sm font-medium text-gold-soft">
                <div className="mx-auto max-w-full truncate">Image</div>
              </th>
              <th className="w-[8%] px-0.5 py-2 text-sm font-medium text-gold-soft">
                <div className="mx-auto max-w-full truncate">Name</div>
              </th>
              <th className="w-[8%] px-0.5 py-2 text-sm font-medium text-gold-soft">
                <div className="mx-auto max-w-full truncate">Description</div>
              </th>
              <th className="w-[4%] px-0.5 py-2 text-sm font-medium text-gold-soft">
                <div className="mx-auto max-w-full truncate">Price</div>
              </th>
              <th className="w-[4%] px-0.5 py-2 text-sm font-medium text-gold-soft">
                <div className="mx-auto max-w-full truncate">Cats</div>
              </th>
              <th className="w-[4%] px-0.5 py-2 text-sm font-medium text-gold-soft">
                <div className="mx-auto max-w-full truncate">Actions</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredSuites.map((suite) => (
              <tr
                key={suite.id}
                className="border-b border-gray-700 transition-colors hover:bg-black-light/50"
              >
                <td className="px-0.5 py-2">
                  <div className="relative w-10 h-10 mx-auto">
                    <Image
                      src={
                        typeof suite.img === "string" &&
                        (suite.img as string).includes("cloudinary.com")
                          ? suite.img
                          : "/default-image.jpg"
                      }
                      alt={suite.name}
                      fill
                      sizes="40px"
                      className="object-cover rounded"
                    />
                  </div>
                </td>
                <td className="truncate px-0.5 py-2 text-center text-sm text-white-ivory">
                  <div className="mx-auto max-w-full truncate">
                    {suite.name}
                  </div>
                </td>
                <td className="truncate px-0.5 py-2 text-center text-sm text-white-ivory">
                  <div className="mx-auto max-w-full truncate">
                    {suite.description}
                  </div>
                </td>
                <td className="truncate px-0.5 py-2 text-center text-sm text-white-ivory">
                  <div className="mx-auto max-w-full truncate">
                    ${suite.price}
                  </div>
                </td>
                <td className="truncate px-0.5 py-2 text-center text-sm text-white-ivory">
                  <div className="mx-auto max-w-full truncate">
                    {suite.number_of_cats}
                  </div>
                </td>
                <td className="px-0.5 py-2">
                  <div className="flex items-center justify-center gap-0.5">
                    <button
                      onClick={() => onEdit(suite)}
                      className="text-gold-soft transition-colors hover:text-gold-hover"
                      title="Edit"
                    >
                      <FaEdit size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setSuiteToDelete(suite);
                        setShowConfirmDelete(true);
                      }}
                      className="text-red-500 transition-colors hover:text-red-600"
                      title="Delete"
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredSuites.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-2 py-3 text-center text-sm text-white-ivory"
                >
                  No suites found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
