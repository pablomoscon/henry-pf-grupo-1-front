"use client";
import Image from "next/image";
import { IRoom } from "@/interfaces/IRoom";
import { useContext } from "react";
import { UserContext } from "@/contexts/userContext";
import { useRouter, usePathname } from "next/navigation";
import { useNavigationGuard } from "@/contexts/navigationGuardContext";

const Detail = ({ room }: { room: IRoom }) => {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const pathname = usePathname();
  const { allowAccessToPage } = useNavigationGuard();

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

  const handleGoToProtectedPage = () => {
    allowAccessToPage("/edit-profile");
    window.location.href = "/edit-profile";
  };

  const handleClick = () => {
    // Aquí combinamos ambas funciones (handleBook + handleGoToProtectedPage)
    handleBook(); // Función para reservar
    handleGoToProtectedPage(); // Función para la protección de la página
  };

  return (
    <div className="flex justify-center px-4 py-6 bg-dark-soft">
      <div className="flex flex-col md:flex-row items-start gap-6 max-w-4xl mx-auto bg-black rounded-lg shadow-lg overflow-hidden">
        <div className="w-full md:w-[300px] h-full relative">
          <Image
            src={room.img}
            alt={room.name}
            layout="fill"
            objectFit="cover"
            className="rounded-l-lg"
          />
        </div>

        <div className="flex flex-col justify-between w-full p-6 md:w-[380px] h-full">
          <div>
            <h2 className="text-2xl text-gold-soft font-secondary font-semibold mb-3">
              {room.name}
            </h2>
            <p className="text-gray-ash text-justify text-base leading-relaxed mb-4">
              {room.description}
            </p>
          </div>

          <div>
            <p className="text-base text-gray-basic mb-3">
              <span className="text-gold-soft font-medium">Cats:</span>{" "}
              {room.number_of_cats}
            </p>

            <div className="mb-4">
              <h4 className="text-lg text-gold-soft font-semibold mb-2">
                Features
              </h4>
              <ul className="list-disc pl-6 space-y-1">
                {room.features.map((feature, index) => (
                  <li key={index} className="text-gray-ash text-sm">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <h3 className="text-xl font-bold text-gold-soft mb-4">
              ${room.price} USD / day
            </h3>

            <button className="px-5 py-2 button_green" onClick={handleClick}>
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
