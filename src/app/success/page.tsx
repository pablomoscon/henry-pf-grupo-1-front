"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function Page() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId");
  const status = searchParams.get("status");

  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (sessionId && status) {
      fetch(
        `http://localhost:3000/payments/status?sessionId=${sessionId}&status=${status}`
      )
        .then((response) => response.text())
        .then((message) => {
          console.log("Mensaje del backend:", message);
          setMessage(message);
          alert(message);
        })
        .catch((error) => {
          console.error("Error al procesar el estado del pago:", error);
          alert("Hubo un problema al procesar el pago.");
        });
    } else {
      console.error("Faltan parámetros en la URL");
      alert("Faltan parámetros necesarios en la URL.");
    }
  }, [sessionId, status]);
  return (
    <div className="text-3xl font-bold text-center py-10 h-screen flex items-center justify-center">
      <div>
        <h1>Gracias por tu compra</h1>
        {message && <p>{message}</p>} {/* Mostrar el mensaje si existe */}
        <Link href="/" className="text-blue-500 block mt-4">
          Volver a The Fancy Box
        </Link>
      </div>
    </div>
  );
}

export default Page;
