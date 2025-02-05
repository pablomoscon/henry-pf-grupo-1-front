"use client";

import { ICat, EditCatModalProps, CatFormData } from "@/interfaces/ICat";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "@/contexts/userContext";
import Image from "next/image";

const EditCatModal = ({ cat, isOpen, onClose, onSave }: EditCatModalProps) => {
  const { user } = useContext(UserContext);
  const token = user?.response?.token;
  const [formData, setFormData] = useState<CatFormData>({
    name: "",
    dateOfBirth: "",
    isNeutered: false,
    weight: "",
    personality: "",
    getsAlongWithOtherCats: "unsure",
    food: "",
    medication: "",
    behaviorAtVet: "",
    vaccinationsAndTests: [],
    photoFile: new File([], ""),
    userId: "",
  });

  useEffect(() => {
    if (!cat) {
      console.warn("Cat data not available");
      return;
    }

    const catFormData: CatFormData = {
      name: cat.name,
      dateOfBirth: cat.dateOfBirth,
      isNeutered: cat.isNeutered,
      weight: cat.weight,
      personality: cat.personality,
      getsAlongWithOtherCats: cat.getsAlongWithOtherCats as
        | "yes"
        | "no"
        | "unsure",
      food: cat.food,
      medication: cat.medication || "",
      behaviorAtVet: cat.behaviorAtVet || "",
      vaccinationsAndTests: cat.vaccinationsAndTests,
      photoFile: cat.photoFile,
      userId: cat.user.id,
    };
    setFormData(catFormData);
  }, [cat, token]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      console.error("No authentication token found");
      return;
    }

    const catData: ICat = {
      id: cat.id,
      name: formData.name,
      dateOfBirth: formData.dateOfBirth,
      isNeutered: formData.isNeutered,
      weight: formData.weight,
      personality: formData.personality,
      getsAlongWithOtherCats: formData.getsAlongWithOtherCats,
      food: formData.food,
      medication: formData.medication,
      behaviorAtVet: formData.behaviorAtVet,
      vaccinationsAndTests: formData.vaccinationsAndTests,
      photoFile: formData.photoFile,
      deleted_at: null,
      user: {
        id: formData.userId,
      },
    };

    onSave(catData, token);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-black-dark p-6 rounded-lg shadow-lg border border-gold-soft/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl text-gold-soft mb-4">Edit Cat Details</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-3">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-1"
                style={{ color: "var(--white-ivory)" }}
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-black-light text-white-ivory p-2 rounded-md border border-gold-soft/20 focus:border-gold-soft/50 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="dateOfBirth"
                className="block text-sm font-medium mb-1"
                style={{ color: "var(--white-ivory)" }}
              >
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full bg-black-light text-white-ivory p-2 rounded-md border border-gold-soft/20 focus:border-gold-soft/50 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="isNeutered"
                className="block text-sm font-medium mb-1"
                style={{ color: "var(--white-ivory)" }}
              >
                Is Neutered
              </label>
              <select
                id="isNeutered"
                name="isNeutered"
                value={formData.isNeutered.toString()}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    isNeutered: e.target.value === "true",
                  }));
                }}
                className="w-full bg-black-light text-white-ivory p-2 rounded-md border border-gold-soft/20 focus:border-gold-soft/50 focus:outline-none"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="weight"
                className="block text-sm font-medium mb-1"
                style={{ color: "var(--white-ivory)" }}
              >
                Weight
              </label>
              <input
                type="text"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full bg-black-light text-white-ivory p-2 rounded-md border border-gold-soft/20 focus:border-gold-soft/50 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="personality"
                className="block text-sm font-medium mb-1"
                style={{ color: "var(--white-ivory)" }}
              >
                Personality
              </label>
              <textarea
                id="personality"
                name="personality"
                value={formData.personality}
                onChange={handleChange}
                className="w-full bg-black-light text-white-ivory p-2 rounded-md border border-gold-soft/20 focus:border-gold-soft/50 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="getsAlongWithOtherCats"
                className="block text-sm font-medium mb-1"
                style={{ color: "var(--white-ivory)" }}
              >
                Gets Along With Other Cats
              </label>
              <select
                id="getsAlongWithOtherCats"
                name="getsAlongWithOtherCats"
                value={formData.getsAlongWithOtherCats}
                onChange={handleChange}
                className="w-full bg-black-light text-white-ivory p-2 rounded-md border border-gold-soft/20 focus:border-gold-soft/50 focus:outline-none"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="unsure">Unsure</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="food"
                className="block text-sm font-medium mb-1"
                style={{ color: "var(--white-ivory)" }}
              >
                Food
              </label>
              <textarea
                id="food"
                name="food"
                value={formData.food}
                onChange={handleChange}
                className="w-full bg-black-light text-white-ivory p-2 rounded-md border border-gold-soft/20 focus:border-gold-soft/50 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="medication"
                className="block text-sm font-medium mb-1"
                style={{ color: "var(--white-ivory)" }}
              >
                Medication
              </label>
              <textarea
                id="medication"
                name="medication"
                value={formData.medication}
                onChange={handleChange}
                className="w-full bg-black-light text-white-ivory p-2 rounded-md border border-gold-soft/20 focus:border-gold-soft/50 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="behaviorAtVet"
                className="block text-sm font-medium mb-1"
                style={{ color: "var(--white-ivory)" }}
              >
                Behavior at Vet
              </label>
              <textarea
                id="behaviorAtVet"
                name="behaviorAtVet"
                value={formData.behaviorAtVet}
                onChange={handleChange}
                className="w-full bg-black-light text-white-ivory p-2 rounded-md border border-gold-soft/20 focus:border-gold-soft/50 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="photoFile"
                className="block text-sm font-medium mb-1"
                style={{ color: "var(--white-ivory)" }}
              >
                Photo
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  id="photoFile"
                  name="photoFile"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) {
                      setFormData((prev) => ({
                        ...prev,
                        photoFile: file,
                      }));
                    }
                  }}
                  className="hidden"
                />
                <label
                  htmlFor="photoFile"
                  className="cursor-pointer px-4 py-2 rounded-lg border border-gold-soft/20 text-gold-soft hover:border-gold-soft/50 transition-colors flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                  Upload Photo
                </label>
                {formData.photoFile && formData.photoFile.size > 0 && (
                  <div className="relative w-20 h-20">
                    <Image
                      src={URL.createObjectURL(formData.photoFile)}
                      alt="Current cat photo"
                      fill
                      sizes="80px"
                      className="object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-end pt-4 border-t border-gold-soft/10">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg border border-gold-soft/20 text-gold-soft/70 hover:text-gold-soft hover:border-gold-soft/50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-gold-soft/20 text-gold-soft hover:bg-gold-soft/30 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCatModal;
