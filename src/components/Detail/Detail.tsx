"use client";
import Image from "next/image";
import { IRoom } from "@/interfaces/IRoom";

const handleBook = () => {
  alert("Iniciar proceso Reserva");
};

const Detail = ({ room }: { room: IRoom }) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="flex flex-col md:flex-row items-start gap-10 max-w-5xl mx-auto">
        <div className="flex-shrink-0 w-full md:w-[380px] h-[500px]  bg-white-basic border border-white-basic rounded-lg">
          <Image src={room.imgs} alt={room.name} width={380} height={400} />
        </div>

        <div className="flex flex-col justify-between w-full md:w-[500px]">
          <div>
            <p className="text-gray-basic text-justify text-xl leading-relaxed mb-6 mt-12">
              {room.description}
            </p>
          </div>
          <div>
            <p className="text-2xl  text-pink-basic mb-6">
              <span className="text-gold-soft">Cats:</span>{" "}
              {room.number_of_cats}
            </p>

            <div className="mb-6">
              <h4 className="text-2xl text-green-dark mb-3">Features</h4>
              <ul className="list-disc pl-6 space-y-2">
                {room.features.map((feature, index) => (
                  <li key={index} className="text-gray-basic text-lg">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <h3 className="text-3xl font-semibold text-white-ivory mb-6">
              ${room.price} USD / day
            </h3>

            <button className="button_gold" onClick={handleBook}>
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
