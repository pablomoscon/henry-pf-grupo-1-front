"use client";
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
  useContext,
  useCallback,
} from "react";
import { IBook } from "@/interfaces/IBook";
import { validateBook } from "@/helpers/validateBook";
import { useDateContext } from "@/contexts/dateContext";
import { UserContext } from "@/contexts/userContext";
import CheckIn from "../CheckIn/CheckIn";
import CheckOut from "../CheckOut/CheckOut";
import { useSearchParams } from "next/navigation";

const ReservationForm = () => {
  const searchParams = useSearchParams();
  const { checkInDate } = useDateContext();
  const { checkOutDate } = useDateContext();
  const { user } = useContext(UserContext);

  const [userData, setUserData] = useState({
    checkInDate: "", // Inicializamos con un valor vacío
    checkOutDate: "",
    roomId: searchParams.get("roomId") || "",
    name: searchParams.get("name") || "",
    price: searchParams.get("price") || "0",
    userId: user?.response?.user?.id,
    fullName: user?.response?.user?.name,
    customerId: user?.response?.user?.customerId,
    totalAmount: 0,
  });

  const [posData, setPosData] = useState({
    userId: "",
    roomId: "",
    checkInDate: "",
    checkOutDate: "",
    totalAmount: "",
  });

  const [totalAmount, setTotalAmount] = useState(0);

  const [errors, setErrors] = useState<IBook>({});

  useEffect(() => {
    if (checkInDate) {
      setUserData((prevData) => ({
        ...prevData,
        checkInDate: checkInDate.format("YYYY-MM-DD"),
      }));
    }
  }, [checkInDate]);

  useEffect(() => {
    if (checkOutDate) {
      setUserData((prevData1) => ({
        ...prevData1,
        checkOutDate: checkOutDate.format("YYYY-MM-DD"),
      }));
    }
  }, [checkOutDate]);

  useEffect(() => {
    setPosData({
      userId: userData.userId || "",
      roomId: userData.roomId || "",
      checkInDate: userData.checkInDate || "",
      checkOutDate: userData.checkOutDate || "",
      totalAmount: totalAmount.toFixed(2) || "0", // Asegúrate de convertir a string si es necesario
    });
  }, [userData, totalAmount]);

  const calculateTotalAmount = useCallback(() => {
    // Validar fechas
    if (!userData.checkInDate || !userData.checkOutDate) {
      console.warn("Una o ambas fechas están vacías.");
      setTotalAmount(0); // Si no hay fechas, no hay total
      return;
    }

    const checkIn = new Date(userData.checkInDate);
    const checkOut = new Date(userData.checkOutDate);

    if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
      console.error("Una o ambas fechas no son válidas.");
      setTotalAmount(0); // Si no son válidas, no hay total
      return;
    }

    // Calcular diferencia de tiempo
    const differenceInTime = checkOut.getTime() - checkIn.getTime();

    // Validar que la fecha de salida sea posterior a la de entrada
    if (differenceInTime < 0) {
      console.error("La fecha de salida es anterior a la fecha de entrada.");
      setTotalAmount(0); // No permitimos totales negativos
      return;
    }

    const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24);

    const total = differenceInDays * Number(userData.price);
    setTotalAmount(total);
    userData.totalAmount = total;
  }, [userData.checkInDate, userData.checkOutDate, userData.price]);

  useEffect(() => {
    calculateTotalAmount();
  }, [calculateTotalAmount]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
    setErrors(validateBook({ ...userData, [name]: value }));
  };

  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateBook(userData, true);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // POST
      console.log("Datos para enviar (postData):", posData);

      alert(
        `Reserva realizada correctamente:
      RoomId: ${userData.roomId}
      Suite Name: ${userData.name}
      Check In: ${userData.checkInDate} 
      Check Out: ${userData.checkOutDate}
      Price: ${userData.price}
      User Id: ${userData.userId}
      Customer Id: ${userData.customerId}
      Full Name: ${userData.fullName}
      Total Amount: ${userData.totalAmount}`
      );
    }
  };

  return (
    <div className="flex items-center justify-center mt-8">
      <form
        onSubmit={handleOnSubmit}
        autoComplete="off"
        className="w-full max-w-2xl mx-auto p-6 rounded-lg shadow-md space-y-4"
        style={{ background: "var(--black-dark)" }}
      >
        <h2 style={{ color: "var(--gold-soft)" }}>Book Details</h2>
        <div className="space-y-2">
          <h2
            className="text-xl font-semibold text-left"
            style={{ color: "var(--green-olive)" }}
          >
            Selected Suite
            --------------------------------------------------------------
          </h2>
          <div className="flex justify-between items-center">
            <span className="text-lg" style={{ color: "var(--white-ivory)" }}>
              {userData.name}
            </span>
            <span>
              -------------------------------------------------------------------------------------
            </span>
            <span className="text-lg" style={{ color: "var(--white-ivory)" }}>
              ${userData.price} USD / day
            </span>
          </div>
        </div>

        <h2
          className="text-xl font-semibold text-left"
          style={{ color: "var(--green-olive)" }}
        >
          Selected Date
          --------------------------------------------------------------
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <div>
            <label>Check In</label>
            <div className="relative">
              <input
                type="text"
                value={userData.checkInDate || ""}
                name="checkInDate"
                placeholder="Check In"
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border p-2
                focus:outline-none focus:ring-2`}
                style={{
                  backgroundColor: "var(--black-light)",
                  color: "var(--white-basic)",
                }}
                disabled
              />
              {errors.checkInDate && (
                <p className="text-red-600">{errors.checkInDate}</p>
              )}
            </div>
            <div className="relative">
              <CheckIn />
            </div>
          </div>

          <div>
            <label>Check Out</label>
            <div className="relative">
              <input
                type="text"
                value={userData.checkOutDate || ""}
                name="checkOutDate"
                placeholder="Check Out"
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border p-2
                focus:outline-none focus:ring-2`}
                style={{
                  backgroundColor: "var(--black-light)",
                  color: "var(--white-basic)",
                }}
                disabled
              />
              {errors.checkOutDate && (
                <p className="text-red-600">{errors.checkOutDate}</p>
              )}
              <div className="relative">
                <CheckOut />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center py-4 border-t border-b border-gray-600">
          <span
            className="text-lg font-semibold"
            style={{ color: "var(--gold-soft)" }}
          >
            Reserve Total
          </span>
          <span>
            -------------------------------------------------------------------------------------
          </span>
          <span className="text-lg" style={{ color: "var(--gold-soft)" }}>
            ${totalAmount.toFixed(2)} USD
          </span>
        </div>

        <div className="space-y-6">
          <h2
            className="text-xl font-semibold text-left mt-10"
            style={{ color: "var(--green-olive)" }}
          >
            Customer Data
            -------------------------------------------------------------
          </h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium mb-1"
                style={{ color: "var(--white-ivory)" }}
              >
                First and Last Name: {userData.fullName}
              </label>
            </div>
            <div>
              <label
                htmlFor="customerId"
                className="block text-sm font-medium mb-1"
                style={{ color: "var(--white-ivory)" }}
              >
                Customer ID: {userData.customerId}
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2
            className="text-xl font-semibold text-left"
            style={{ color: "var(--green-olive)" }}
          >
            Kitty Cats
            -------------------------------------------------------------------
          </h2>
          <div className="space-y-4">
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: "var(--white-ivory)" }}
            >
              Kitty Cat Name
            </label>
            <div className="flex items-center space-x-4">
              {/* Select para los gatitos */}
              <select
                name="selectedKitty"
                className="block w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-green-500"
                style={{
                  backgroundColor: "var(--white-ivory)",
                  color: "var(--black-dark)",
                }}
              >
                <option value="" disabled selected>
                  Select a kitty
                </option>
                <option value="Whiskers">Whiskers</option>
                <option value="Luna">Luna</option>
              </select>

              {/* Botón New */}
              <button type="button" className="button_green">
                New
              </button>
            </div>
          </div>
        </div>

        {/* Centrando el botón */}
        <div className="flex justify-center pt-5">
          <button className="button_gold">Book</button>
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;
