import React from "react";

interface IBookCaretaker {
  Customer: string;
  Cats: string;
  Suite: string;
  Desde: string;
  Hasta: string;
}

// Tipar las props del componente
const CardBook: React.FC<{ book: IBookCaretaker }> = ({ book }) => {
  return (
    <div className="bg-black-dark border border-white-basic rounded-lg p-4 mb-4 flex justify-between items-center">
      <div className="text-white-basic space-y-1">
        <p>
          <span className="text-gold-soft font-semibold">Customer: </span>
          {book.Customer}
        </p>
        <p>
          <span className="text-gold-soft font-semibold">Cats: </span>
          {book.Cats}
        </p>
        <p>
          <span className="text-gold-soft font-semibold">Suite: </span>
          {book.Suite}
        </p>
        <p>
          <span className="text-gold-soft font-semibold">Desde: </span>
          {book.Desde}
        </p>
        <p>
          <span className="text-gold-soft font-semibold">Hasta: </span>
          {book.Hasta}
        </p>
      </div>

      <div className="flex flex-col space-y-2">
        <button className="bg-green-olive text-white px-6 py-2 rounded-lg transition-colors duration-300 hover:bg-green-olive/80">
          Feed
        </button>
        <button className="bg-gold-dark text-white px-6 py-2 rounded-lg transition-colors duration-300 hover:bg-gold-dark/80">
          Chat
        </button>
      </div>
    </div>
  );
};

export default CardBook;
