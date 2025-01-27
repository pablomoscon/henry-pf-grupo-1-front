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
  }, [cat]);

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-black-dark p-8 rounded-xl shadow-lg border border-gold-soft/10 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl text-gold-soft mb-6">Edit Cat Details</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="text-sm text-gold-soft/70 block mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-black-light text-white-ivory p-3 rounded-lg border border-gold-soft/20 focus:border-gold-soft/50 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="dateOfBirth"
              className="text-sm text-gold-soft/70 block mb-1"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full bg-black-light text-white-ivory p-3 rounded-lg border border-gold-soft/20 focus:border-gold-soft/50 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-gold-soft/70 block mb-1">
              <input
                type="checkbox"
                name="isNeutered"
                checked={formData.isNeutered}
                onChange={handleChange}
                className="mr-2"
              />
              Is Neutered
            </label>
          </div>

          <div>
            <label
              htmlFor="weight"
              className="text-sm text-gold-soft/70 block mb-1"
            >
              Weight
            </label>
            <input
              type="text"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full bg-black-light text-white-ivory p-3 rounded-lg border border-gold-soft/20 focus:border-gold-soft/50 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="personality"
              className="text-sm text-gold-soft/70 block mb-1"
            >
              Personality
            </label>
            <textarea
              id="personality"
              name="personality"
              value={formData.personality}
              onChange={handleChange}
              className="w-full bg-black-light text-white-ivory p-3 rounded-lg border border-gold-soft/20 focus:border-gold-soft/50 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="getsAlongWithOtherCats"
              className="text-sm text-gold-soft/70 block mb-1"
            >
              Gets Along With Other Cats
            </label>
            <select
              id="getsAlongWithOtherCats"
              name="getsAlongWithOtherCats"
              value={formData.getsAlongWithOtherCats}
              onChange={handleChange}
              className="w-full bg-black-light text-white-ivory p-3 rounded-lg border border-gold-soft/20 focus:border-gold-soft/50 focus:outline-none"
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="unsure">Unsure</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="food"
              className="text-sm text-gold-soft/70 block mb-1"
            >
              Food
            </label>
            <textarea
              id="food"
              name="food"
              value={formData.food}
              onChange={handleChange}
              className="w-full bg-black-light text-white-ivory p-3 rounded-lg border border-gold-soft/20 focus:border-gold-soft/50 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="medication"
              className="text-sm text-gold-soft/70 block mb-1"
            >
              Medication
            </label>
            <textarea
              id="medication"
              name="medication"
              value={formData.medication}
              onChange={handleChange}
              className="w-full bg-black-light text-white-ivory p-3 rounded-lg border border-gold-soft/20 focus:border-gold-soft/50 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="behaviorAtVet"
              className="text-sm text-gold-soft/70 block mb-1"
            >
              Behavior at Vet
            </label>
            <textarea
              id="behaviorAtVet"
              name="behaviorAtVet"
              value={formData.behaviorAtVet}
              onChange={handleChange}
              className="w-full bg-black-light text-white-ivory p-3 rounded-lg border border-gold-soft/20 focus:border-gold-soft/50 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="photoFile"
              className="text-sm text-gold-soft/70 block mb-1"
            >
              Photo
            </label>
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
              className="w-full bg-black-light text-white-ivory p-3 rounded-lg border border-gold-soft/20 focus:border-gold-soft/50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold-soft file:text-black-dark hover:file:bg-gold-dark"
            />
            {formData.photoFile && formData.photoFile.size > 0 && (
              <div className="mt-2 relative w-20 h-20">
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

          <div className="flex gap-4 justify-end pt-6 border-t border-gold-soft/10">
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
