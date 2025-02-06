"use client";
import Image from "next/image";
import { IRoomResponse } from "@/interfaces/IRoom";
import { useContext } from "react";
import { UserContext } from "@/contexts/userContext";
import { useRouter, usePathname } from "next/navigation";

const Detail = ({ room }: { room: IRoomResponse }) => {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const pathname = usePathname();

  const handleBook = () => {
    if (user) {
      router.push(
        `/reserve?roomId=${room.id}&name=${room.name}&price=${room.price}&numCat=${room.number_of_cats}`
      );
    } else {
      alert("Please log in first!");
      router.push(`/login?redirect=${pathname}`);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 flex items-center justify-center bg-black-dark">
      <div
        className="w-full max-w-xl mx-auto p-6 rounded-lg shadow-md space-y-6"
        style={{ background: "var(--black-light)" }}
      >
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-[250px] h-[250px] relative rounded-lg overflow-hidden">
            <Image
              src={room.img}
              alt={room.name}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>

          <div className="flex flex-col justify-between w-full space-y-4">
            <div className="space-y-4">
              <h2
                className="text-2xl font-secondary font-semibold"
                style={{ color: "var(--gold-soft)" }}
              >
                {room.name}
              </h2>

              <p
                className="text-justify text-base leading-relaxed"
                style={{ color: "var(--gray-ash)" }}
              >
                {room.description}
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-base" style={{ color: "var(--gray-basic)" }}>
                <span
                  style={{ color: "var(--gold-soft)" }}
                  className="font-medium"
                >
                  Cats:
                </span>{" "}
                {room.number_of_cats}
              </p>

              <div>
                <h4
                  className="text-lg font-semibold mb-2"
                  style={{ color: "var(--gold-soft)" }}
                >
                  Features
                </h4>
                <ul className="list-disc pl-6 space-y-1">
                  {room.features.map((feature, index) => (
                    <li
                      key={index}
                      style={{ color: "var(--gray-ash)" }}
                      className="text-sm"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <h3
                className="text-xl font-bold"
                style={{ color: "var(--gold-soft)" }}
              >
                ${room.price} USD / day
              </h3>

              <button
                className="button_green w-full py-2.5 text-lg"
                onClick={handleBook}
              >
                Book
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
