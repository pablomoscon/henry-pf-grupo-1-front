"use client";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

export default function ToastifyAlert() {
  useEffect(() => {
    const originalAlert = window.alert;

    window.alert = (message: string) => {
      toast(message, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    };

    return () => {
      window.alert = originalAlert;
    };
  }, []);

  return <ToastContainer limit={3} />;
}
