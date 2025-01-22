"use client";
import {
  ChangeEvent,
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
import { getCatsUser } from "@/services/catServices";
import { ICat } from "../../interfaces/ICat";
import { bookRegister } from "@/services/bookService";
import ReservationModal from "../ReservationModal/ReservationModal";
import { useRouter } from "next/navigation";

const ReservationForm = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const { checkInDate } = useDateContext();
  const { checkOutDate } = useDateContext();
  const { user } = useContext(UserContext);

  const [userData, setUserData] = useState<{
    checkInDate: string;
    checkOutDate: string;
    roomId: string;
    name: string;
    price: string;
    userId: string | undefined;
    fullName: string | undefined;
    customerId: string | undefined;
    totalAmount: number;
    catsIds: string[]; // Agregamos la propiedad catsIds como un array de strings
  }>({
    checkInDate: "",
    checkOutDate: "",
    roomId: searchParams.get("roomId") || "",
    name: searchParams.get("name") || "",
    price: searchParams.get("price") || "0",
    userId: user?.response.user.id,
    fullName: user?.response?.user?.name,
    customerId: user?.response?.user?.customerId,
    totalAmount: 0,
    catsIds: [], // Inicializamos el array vacío para catsIds
  });

  const [posData, setPosData] = useState<{
    userId: string;
    roomId: string;
    checkInDate: string;
    checkOutDate: string;
    totalAmount: number;
    catsIds: string[]; // Aseguramos que sea un array de strings
  }>({
    userId: "",
    roomId: "",
    checkInDate: "",
    checkOutDate: "",
    totalAmount: 0,
    catsIds: [], // Inicializamos el array vacío
  });

  const [cats, setCats] = useState<ICat[]>([]);

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
      totalAmount: Number(totalAmount) || 0,
      catsIds: userData.catsIds,
    });
  }, [userData, totalAmount]);

  useEffect(() => {
    const fetchCats = async () => {
      if (userData.userId) {
        try {
          const fetchedCats = await getCatsUser(userData.userId);
          setCats(fetchedCats); // Actualiza el estado con los gatos obtenidos
        } catch (error) {
          console.error("Error al obtener los gatos:", error);
        }
      } else {
        console.warn(
          "No se puede obtener la lista de gatos: el ID del usuario no está definido."
        );
      }
    };

    fetchCats();
  }, [userData.userId]); // Llama a fetchCats cada vez que cambie el userId

  const calculateTotalAmount = useCallback(() => {
    if (!userData.checkInDate || !userData.checkOutDate) {
      setTotalAmount(0);
      return;
    }

    const checkIn = new Date(userData.checkInDate);
    const checkOut = new Date(userData.checkOutDate);

    if (
      isNaN(checkIn.getTime()) ||
      isNaN(checkOut.getTime()) ||
      checkOut < checkIn
    ) {
      setTotalAmount(0);
      return;
    }

    const differenceInDays = Math.ceil(
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
    );

    setTotalAmount(differenceInDays * Number(userData.price));
  }, [userData.checkInDate, userData.checkOutDate, userData.price]);

  useEffect(() => {
    calculateTotalAmount();
  }, [calculateTotalAmount]);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
    setErrors(validateBook({ ...userData, [name]: value }));
  };

  const handleModalConfirm = async () => {
    closeModal();
    try {
      console.log(posData);
      const res = await bookRegister(posData);
      alert("Reservation successful!");

      if (!res.message) {
        const reservationId = res.id; // ID devuelto por el POST *********
        /* const res1 = await confirmPayment(reservationId); */
        router.push(
          `http://localhost:3000/payments/create-checkout-session/${reservationId}`
        ); // Redirige con el ID *********
        setUserData({
          checkInDate: "",
          checkOutDate: "",
          roomId: "",
          name: "",
          price: "0",
          userId: "",
          fullName: "",
          customerId: "",
          totalAmount: 0,
          catsIds: [],
        });
        setPosData({
          userId: "",
          roomId: "",
          checkInDate: "",
          checkOutDate: "",
          totalAmount: 0,
          catsIds: [],
        });
      } else {
        alert(res.message || "Reservation failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Connection error. Please try again later.");
    }
  };

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateBook(userData, true);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Configura `posData` antes de mostrar el modal
      setPosData({
        userId: userData.userId,
        roomId: userData.roomId,
        checkInDate: userData.checkInDate,
        checkOutDate: userData.checkOutDate,
        totalAmount: totalAmount, // Ejemplo de cómo calcular el monto total
        catsIds: userData.catsIds,
      });
      openModal(); // Abre el modal
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
        <h2 style={{ color: "var(--gold-soft)" }}>Book</h2>
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
              --------------------------------------------------------------
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
              <CheckIn roomId={userData.roomId} />
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
                <CheckOut roomId={userData.roomId} />
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
            ${totalAmount} USD
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
            <div className="space-y-4">
              <label htmlFor="selectCat">Select Kitties:</label>
              <select
                name="catsIds"
                multiple // Permite seleccionar múltiples gatitos
                value={userData.catsIds} // Array de IDs seleccionados
                onChange={(e) => {
                  const selectedOptions = Array.from(
                    e.target.selectedOptions,
                    (option) => option.value
                  );
                  setUserData({
                    ...userData,
                    catsIds: selectedOptions, // Actualiza el array con los IDs seleccionados
                  });
                }}
                className="block w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-gold-dark bg-black text-white"
              >
                <option value="" disabled>
                  Select one or more kitties
                </option>
                {cats.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Centrando el botón */}
        <div className="flex justify-center pt-5">
          <button className="button_gold">Book</button>
        </div>
      </form>
      {/* Renderiza el modal */}
      <ReservationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleModalConfirm}
        totalAmount={posData.totalAmount}
        checkInDate={posData.checkInDate}
        checkOutDate={posData.checkOutDate}
      />
    </div>
  );
};

export default ReservationForm;
