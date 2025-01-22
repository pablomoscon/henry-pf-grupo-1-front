import { useState } from "react";
import { CalendarIcon } from "../Icons/CalendarIcon";

interface FilterProps {
  onFilter: (
    checkInDate: string,
    checkOutDate: string,
    numberOfCats: string,
    minPrice: string,
    maxPrice: string
  ) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilter }) => {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [numberOfCats, setNumberOfCats] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearch = () => {
    onFilter(checkInDate, checkOutDate, numberOfCats, minPrice, maxPrice);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
      <div className="space-y-2">
        <label className="block text-gold-soft text-sm">Check In</label>
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center">
            <CalendarIcon className="h-5 w-5 text-gray-ash" />
          </span>
          <input
            type="date"
            className="pl-10 w-full p-2 bg-black rounded border border-gray-ash text-white-ivory"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-gold-soft text-sm">Check Out</label>
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center">
            <CalendarIcon className="h-5 w-5 text-gray-ash" />
          </span>
          <input
            type="date"
            className="pl-10 w-full p-2 bg-black rounded border border-gray-ash text-white-ivory"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center">
        <div>
          <label className="block text-gold-soft text-sm mb-2">Cats</label>
          <input
            type="number"
            className="w-full p-2 bg-black rounded border border-gray-ash text-white-ivory no-arrows"
            value={numberOfCats}
            onChange={(e) => setNumberOfCats(e.target.value)}
            min="0"
            max="4"
            style={{ width: "90%" }}
          />
        </div>
        <div>
          <label className="block text-gold-soft text-sm  mb-2">
            Min Price
          </label>
          <input
            type="number"
            className="w-full p-2 bg-black rounded border border-gray-ash text-white-ivory no-arrows"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            min="0"
            max="40"
            style={{ width: "90%" }}
          />
        </div>
        <div>
          <label className="block text-gold-soft text-sm  mb-2">
            Max Price
          </label>
          <input
            type="number"
            className="w-full p-2 bg-black rounded border border-gray-ash text-white-ivory no-arrows"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            min="0"
            max="40"
            style={{ width: "90%" }}
          />
        </div>
      </div>
      <div className="col-span-full md:col-span-1 ">
        <button
          className="w-full p-2 mt-5 bg-gold-soft text-black font-semibold rounded hover:bg-gold-hard"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Filter;
