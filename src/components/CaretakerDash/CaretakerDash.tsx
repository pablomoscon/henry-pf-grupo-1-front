"use client";

import { UserContext } from "@/contexts/userContext";
import { useContext } from "react";
import CardBook from "../CardBook/CardBook";

const CaretakerDash = () => {
  const { user } = useContext(UserContext);
  const userData = user?.response?.user;

  const books = [
    {
      Customer: "Carlos Benitez",
      Cats: "Michi, Pucho",
      Suite: "5 Star Suite",
      Desde: "15/03/2025",
      Hasta: "18/03/2025",
    },
    {
      Customer: "Ana López",
      Cats: "Luna",
      Suite: "Luxury Suite",
      Desde: "20/03/2025",
      Hasta: "25/03/2025",
    },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen pt-24 pb-12 px-4">
      <h1 className="text-4xl text-center text-gold-soft pb-8">
        Welcome {userData?.name}
      </h1>

      <div className="bg-black-light border border-white-basic rounded-lg p-6 w-full max-w-4xl">
        <h2 className="text-2xl text-gold-soft mb-4">My Guests</h2>

        {books.length > 0 ? (
          books.map((book, index) => <CardBook key={index} book={book} />)
        ) : (
          <p className="text-white-basic text-center">No reservations yet.</p>
        )}
      </div>
    </div>
  );
};

export default CaretakerDash;
