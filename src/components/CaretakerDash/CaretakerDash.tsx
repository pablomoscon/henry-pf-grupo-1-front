"use client";

import { useState, useEffect, useContext } from "react";
import { UserContext } from "@/contexts/userContext";
import { getUserBooks } from "@/services/bookService";
import CardBook from "../CardBook/CardBook";
import { IBookCaretaker } from "@/interfaces/IBook";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
const CaretakerDash = () => {
  const { user } = useContext(UserContext);
  const userData = user?.response?.user;
  const token = user?.response.token;

  const [books, setBooks] = useState<IBookCaretaker[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      if (!userData?.id) return;
      const reservations = await getUserBooks(userData.id, token);
      setBooks(reservations);
      setIsLoading(false);
    };

    fetchBooks();
  }, [userData, token]);

  console.log(books);

  return (
    <div className="flex flex-col items-center min-h-screen pt-24 pb-12 px-4">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h1 className="text-4xl text-center text-gold-soft pb-8">
            Welcome {userData?.name}
          </h1>

          <div className="bg-black-light border border-white-basic rounded-lg p-6 w-full max-w-4xl">
            <h2 className="text-2xl text-gold-soft mb-4">My Guests</h2>

            {books.length > 0 ? (
              books.map((book) => <CardBook key={book.userId} book={book} />)
            ) : (
              <p className="text-white-basic text-center">
                No reservations yet.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CaretakerDash;
