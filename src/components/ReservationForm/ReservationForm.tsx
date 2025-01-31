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
import { bookRegister } from "@/services/bookService";
import ReservationModal from "../ReservationModal/ReservationModal";
import { useRouter } from "next/navigation";
import { ICatUser } from "@/interfaces/IBook";

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
    numCat: number;
    name: string;
    price: string;
    userId: string | undefined;
    token: string | undefined;
    fullName: string | undefined;
    customerId: string | undefined;
    totalAmount: number;
    catsIds: string[]; // Agregamos la propiedad catsIds como un array de strings
  }>({
    checkInDate: "",
    checkOutDate: "",
    roomId: searchParams.get("roomId") || "",
    numCat: Number(searchParams.get("numCat") || ""),
    name: searchParams.get("name") || "",
    price: searchParams.get("price") || "0",
    userId: user?.response.user.id,
    token: user?.response.token,
    fullName: user?.response?.user?.name,
    customerId: user?.response?.user?.customerId,
    totalAmount: 0,
    catsIds: [], // Inicializamos el array vacío para catsIds
  });

  const [posData, setPosData] = useState<{
    userId: string | undefined;
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

  const [cats, setCats] = useState<ICatUser[]>([]);

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
          const fetchedCats = await getCatsUser(
            userData.userId,
            userData.token
          );
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
  }, [userData.userId, userData.token]); // Llama a fetchCats cada vez que cambie el userId

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

    // Actualiza el estado de userData
    const updatedData = { ...userData, [name]: value };
    setUserData(updatedData);

    // Ejecuta la validación completa después de actualizar el estado de userData
    const validationErrors = validateBook(updatedData);

    // Elimina los errores de checkInDate y checkOutDate si son válidos
    if (name === "checkInDate" || name === "checkOutDate") {
      if (updatedData.checkInDate && updatedData.checkOutDate) {
        // Verifica si las fechas son correctas
        if (
          new Date(updatedData.checkOutDate) > new Date(updatedData.checkInDate)
        ) {
          // Solo elimina el error si las fechas son válidas
          delete validationErrors.checkInDate;
          delete validationErrors.checkOutDate;
        }
      }
    }

    // Actualiza el estado de errores
    setErrors((prevErrors) => {
      delete prevErrors.catsIds;
      return { ...prevErrors };
    });
  };

  const handleModalConfirm = async () => {
    closeModal();
    try {
      const res = await bookRegister(posData, userData.token);
      alert("Reservation successful!");

      if (!res.message) {
        const reservationId = res.id; // ID devuelto por el POST
        const token = userData.token;

        router.push(
          `http://localhost:3000/payments/create-checkout-session/${reservationId}?token=${token}`
        );

        setUserData({
          checkInDate: "",
          checkOutDate: "",
          roomId: "",
          name: "",
          price: "0",
          userId: "",
          token: "",
          numCat: 0,
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
      alert(
        "There are errors in the entered data. Please review and correct them."
      );
      setErrors(validationErrors);
    } else {
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
    <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center bg-black-dark">
      <form
        onSubmit={handleOnSubmit}
        autoComplete="off"
        className="w-full max-w-2xl mx-auto p-6 rounded-lg shadow-md space-y-3"
        style={{ background: "var(--black-dark)" }}
      >
        <h2 className="text-2xl mb-4" style={{ color: "var(--gold-soft)" }}>
          Book
        </h2>

        <div className="space-y-3">
          <div>
            <h2
              className="text-xl font-semibold"
              style={{ color: "var(--green-olive)" }}
            >
              Selected Suite
            </h2>
            <div
              className="flex justify-between items-center mt-2 p-2 rounded"
              style={{ background: "var(--black-light)" }}
            >
              <span className="text-lg" style={{ color: "var(--white-ivory)" }}>
                {userData.name}
              </span>
              <span className="text-lg" style={{ color: "var(--white-ivory)" }}>
                {userData.numCat} cats
              </span>
              <span className="text-lg" style={{ color: "var(--white-ivory)" }}>
                ${userData.price} USD / day
              </span>
            </div>
          </div>

          <div className="mt-6">
            <h2
              className="text-xl font-semibold mb-3"
              style={{ color: "var(--green-olive)" }}
            >
              Selected Date
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  className="block text-sm font-medium"
                  style={{ color: "var(--white-ivory)" }}
                >
                  Check In
                </label>
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
                  <CheckIn roomId={userData.roomId} token={userData.token} />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  className="block text-sm font-medium"
                  style={{ color: "var(--white-ivory)" }}
                >
                  Check Out
                </label>
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
                    <CheckOut roomId={userData.roomId} token={userData.token} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center py-4 my-6 border-t border-b border-gray-600">
            <span
              className="text-lg font-semibold"
              style={{ color: "var(--gold-soft)" }}
            >
              Reserve Total
            </span>
            <span className="text-lg" style={{ color: "var(--gold-soft)" }}>
              ${totalAmount} USD
            </span>
          </div>

          <div className="space-y-3">
            <h2
              className="text-xl font-semibold"
              style={{ color: "var(--green-olive)" }}
            >
              Customer Data
            </h2>
            <div
              className="p-2 rounded"
              style={{ background: "var(--black-light)" }}
            >
              <div className="mb-2">
                <label
                  className="block text-sm font-medium"
                  style={{ color: "var(--white-ivory)" }}
                >
                  First and Last Name: {userData.fullName}
                </label>
              </div>
              <div>
                <label
                  className="block text-sm font-medium"
                  style={{ color: "var(--white-ivory)" }}
                >
                  Customer DNI: {userData.customerId}
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h2
              className="text-xl font-semibold"
              style={{ color: "var(--green-olive)" }}
            >
              Kitty Cats
            </h2>
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--white-ivory)" }}
              >
                Select Kitties:
              </label>
              <select
                name="catsIds"
                multiple
                value={userData.catsIds}
                onChange={(e) => {
                  const selectedOptions = Array.from(
                    e.target.selectedOptions,
                    (option) => option.value
                  );

                  setUserData({
                    ...userData,
                    catsIds: selectedOptions, // Actualiza el array con los IDs seleccionados
                  });

                  // Eliminar el error si se corrige
                  if (
                    selectedOptions.length > 0 &&
                    selectedOptions.length <= userData.numCat
                  ) {
                    setErrors((prevErrors) => {
                      delete prevErrors.catsIds;
                      return { ...prevErrors };
                    });
                  }
                }}
                className="block w-full px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: "var(--black-light)",
                  color: "var(--white-basic)",
                }}
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
              {errors.catsIds && (
                <p className="mt-1 text-sm text-red-500">{errors.catsIds}</p>
              )}
            </div>
          </div>

          <div className="flex justify-center pt-6">
            <button type="submit" className="button_gold w-full py-2.5 text-lg">
              Book
            </button>
          </div>
        </div>
      </form>
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
