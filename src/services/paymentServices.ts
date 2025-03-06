import { API_URL } from "../../envs";
import { fetchWithInterceptor } from "./fetchInterceptor";

// Función para obtener el estado del pago
export const fetchPaymentStatus = async (
  sessionId: string,
  status: string,
  token: string
): Promise<string> => {
  if (!token) {
    throw new Error('Token not available.');
  }

  const url = `${API_URL}/payments/status?sessionId=${sessionId}&status=${status}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Error al obtener el estado del pago.');
  }

  return response.text();
};

// Función para confirmar el pago
export const confirmPayment = async (reservationId: string, token?: string) => {
  try {
    console.log("token", token);

    const response = await fetchWithInterceptor(
      `${API_URL}/payments/create-checkout-session/${reservationId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      }
    );

    if (response === null || !response.ok) {
      throw new Error("Error creating the payment session");
    }

    const data = await response.json();

    if (data.sessionUrl) {
      window.location.href = data.sessionUrl;
    } else {
      throw new Error("Error: No session URL received.");
    }
  } catch (error) {
    console.error("Error during payment process:", error);
    alert("Payment process failed. Please try again.");
  }
};
