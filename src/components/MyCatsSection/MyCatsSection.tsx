"use client";

import { UserContext } from "@/contexts/userContext";
import { useContext, useEffect, useState } from "react";
import { CatFormData, ICat } from "@/interfaces/ICat";
import EditCatModal from "../EditCatModal/EditCatModal";
import { updateCat, getCats } from "@/services/catServices";
import Link from "next/link";
import Image from "next/image";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export const MyCatsSection = () => {
  const { user } = useContext(UserContext);
  const [cats, setCats] = useState<ICat[]>([]);
  const [selectedCat, setSelectedCat] = useState<ICat | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = user?.response?.token;
  const userData = user?.response?.user;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const userId = userData?.id;
        if (!userId) return;

        const catsData = await getCats(token);
        const userCats = catsData.filter((cat) => cat.user?.id === userId);
        setCats(userCats);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching cats:", error);
      }
    };

    if (userData?.id) {
      fetchCats();
    }
  }, [userData?.id, token]);

  const handleEditCat = (cat: ICat) => {
    setSelectedCat(cat);
    setIsModalOpen(true);
  };

  const handleSaveCat = async (updatedCat: ICat, token: string) => {
    if (!token) {
      console.error("No authentication token found");
      return;
    }

    try {
      const catFormData: CatFormData = {
        name: updatedCat.name,
        dateOfBirth: updatedCat.dateOfBirth,
        isNeutered: updatedCat.isNeutered,
        weight: updatedCat.weight,
        personality: updatedCat.personality,
        getsAlongWithOtherCats:
          updatedCat.getsAlongWithOtherCats === "yes" ||
          updatedCat.getsAlongWithOtherCats === "no" ||
          updatedCat.getsAlongWithOtherCats === "unsure"
            ? updatedCat.getsAlongWithOtherCats
            : "unsure",
        food: updatedCat.food,
        medication: updatedCat.medication || "",
        behaviorAtVet: updatedCat.behaviorAtVet || "",
        vaccinationsAndTests: updatedCat.vaccinationsAndTests,
        photoFile: updatedCat.photoFile,
        userId: updatedCat.user.id,
      };

      if (updatedCat.photoFile instanceof File) {
        catFormData.photoFile = updatedCat.photoFile;
      }

      await updateCat(catFormData, updatedCat.id, token);
      const updatedCats = await getCats(token);
      setCats(
        updatedCats.filter((cat) => cat.user?.id === user?.response?.user?.id)
      );
      setIsModalOpen(false);
      setSelectedCat(null);
    } catch (error) {
      console.error("Error updating cat:", error);
      alert("Failed to update cat. Please try again.");
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="text-center">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <h2 className="text-2xl text-gold-soft mb-4 flex items-center gap-2">
            <span className="text-2xl"></span>
            My Cats
          </h2>
          <div className="bg-black-dark p-6 rounded-xl shadow-lg border border-gold-soft/10 hover:border-gold-soft/30 transition-colors">
            {cats.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cats.map((cat) => (
                    <div
                      key={cat.id}
                      className="p-4 border border-gray-600 rounded-lg hover:border-gold-soft/50 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {cat.photo ? (
                            <div className="relative w-20 h-20">
                              <Image
                                src={cat.photo}
                                alt={cat.name}
                                fill
                                sizes="80px"
                                className="object-cover rounded-full"
                                priority
                              />
                            </div>
                          ) : (
                            <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center">
                              <span className="text-2xl">🐱</span>
                            </div>
                          )}
                          <div>
                            <h3 className="text-gold-soft text-lg font-medium">
                              {cat.name}
                            </h3>
                            <p className="text-white-ivory">
                              Born:{" "}
                              {new Date(cat.dateOfBirth).toLocaleDateString()}
                            </p>
                            <p className="text-white-ivory">
                              Weight: {cat.weight} kg
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleEditCat(cat)}
                          className="text-gold-soft/70 hover:text-gold-soft transition-colors"
                          aria-label="Edit Cat"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gold-soft/10">
                  <Link
                    href="/new-cat"
                    className="text-gold-soft/70 text-sm hover:text-gold-soft transition-colors flex items-center gap-2"
                  >
                    <span>Add More Cats</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-center">
                <p className="text-white-ivory mb-4">
                  You have not registered any cats yet.
                </p>
                <Link href="/new-cat" className="button_green inline-block">
                  Add Cat
                </Link>
              </div>
            )}
          </div>

          {selectedCat && token && (
            <EditCatModal
              cat={selectedCat}
              isOpen={isModalOpen}
              onClose={() => {
                setIsModalOpen(false);
                setSelectedCat(null);
              }}
              onSave={(updatedCat) => handleSaveCat(updatedCat, token)}
            />
          )}
        </>
      )}
    </>
  );
};
