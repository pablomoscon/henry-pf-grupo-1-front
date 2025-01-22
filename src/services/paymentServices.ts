import { IBook } from "@/interfaces/IBook";

export const fetchPaymentStatus = async (
  sessionId: string,
  status: string
): Promise<string> => {
  const url = `http://localhost:3001/payments/status?sessionId=${sessionId}&status=${status}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Error al obtener el estado del pago.");
  }

  return response.text();
};

export const confirmPayment = async (reservation: IBook) => {
  try {
    const reservationId = reservation.id;

    const res = await fetch(
      `http://localhost:3000/payments/create-checkout-session/${reservationId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data);
    window.location.href = data.url;
  } catch (error) {
    console.error("Error during payment simulation:", error);
  }
};
