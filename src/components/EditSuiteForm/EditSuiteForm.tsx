import { useState } from "react";
import { useFormik } from "formik";
import { IRoomResponse } from "@/interfaces/IRoom";
import { roomService } from "@/services/roomService";
import Image from "next/image";

interface EditSuiteFormProps {
  suite: IRoomResponse;
  onClose: () => void;
  onSuccess: () => void;
  token: string;
}

export const EditSuiteForm = ({
  suite,
  onClose,
  onSuccess,
  token,
}: EditSuiteFormProps) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const AVAILABLE_FEATURES = [
    "Hiding Place",
    "Hammocks",
    "Scratchers",
    "Suspension Bridges",
    "Window View",
    "Climbing Wall",
    "Toys",
    "Private Litter Box",
    "Food & Water Station",
    "Grooming Station",
  ];

  const [newFeature, setNewFeature] = useState("");
  const [features, setFeatures] = useState<string[]>(suite.features || []);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>(suite.img);

  const abbreviateFeature = (feature: string) => {
    const abbreviations: { [key: string]: string } = {
      "Hiding Place": "Hide",
      Hammocks: "Ham",
      Scratchers: "Scratch",
      "Suspension Bridges": "Bridge",
      "Window View": "Window",
      "Climbing Wall": "Climb",
      Toys: "Toys",
      "Private Litter Box": "Litter",
      "Food & Water Station": "Food",
      "Grooming Station": "Groom",
    };
    return abbreviations[feature] || feature;
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const formik = useFormik({
    initialValues: {
      name: suite.name,
      description: suite.description,
      price: suite.price,
      number_of_cats: suite.number_of_cats,
      features: features,
      img: null as File | null,
    },
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("price", values.price.toString());
        formData.append("number_of_cats", values.number_of_cats.toString());

        if (selectedImage) {
          formData.append("img", selectedImage);
        }

        // Append features
        values.features.forEach((feature, index) => {
          formData.append(`features[${index}]`, feature);
        });

        await roomService.updateRoom(formData, suite.id || "", token);
        onSuccess();
        onClose();
      } catch (error) {
        console.error("Error updating suite:", error);
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const handleAddFeature = () => {
    if (newFeature && !features.includes(newFeature)) {
      setFeatures([...features, newFeature]);
      setNewFeature("");
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center overflow-y-auto p-4 mt-24">
      <div className="bg-black-dark p-4 rounded-lg w-full max-w-2xl my-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl text-gold-soft">Edit Suite</h2>
          <button
            onClick={onClose}
            className="text-white-ivory hover:text-gold-soft text-xl"
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Columna Izquierda */}
          <div className="flex flex-col space-y-4">
            <div>
              <label className="text-white-ivory block mb-1 text-sm">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                className="w-full bg-black-light text-white-ivory p-2 rounded text-sm"
              />
            </div>

            <div>
              <label className="text-white-ivory block mt-3 mb-1 text-sm">
                Description
              </label>
              <textarea
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                className="w-full bg-black-light text-white-ivory p-2 rounded h-[100px] resize-none text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-white-ivory block mt-2 mb-1 text-sm">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  className="w-full bg-black-light text-white-ivory p-2 rounded text-sm"
                />
              </div>
              <div>
                <label className="text-white-ivory block mt-2 mb-1 text-sm">
                  Cats
                </label>
                <input
                  type="number"
                  name="number_of_cats"
                  value={formik.values.number_of_cats}
                  onChange={formik.handleChange}
                  className="w-full bg-black-light text-white-ivory p-2 rounded text-sm"
                />
              </div>
            </div>
          </div>

          {/* Columna Derecha */}
          <div className="flex flex-col space-y-4">
            <div>
              <label className="text-white-ivory block mb-1 text-sm">
                Image
              </label>
              <div className="bg-black-light rounded p-2 space-y-2">
                {previewImage && (
                  <div className="relative w-full h-[100px]">
                    <Image
                      src={previewImage}
                      alt="Suite preview"
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-white-ivory text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-white-ivory block mb-1 text-sm">
                Features
              </label>
              <div className="bg-black-light rounded p-2 space-y-2">
                <div className="flex flex-wrap gap-1 h-8 overflow-y-auto">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="bg-black-darker text-white-ivory px-2 py-0.5 rounded-full flex items-center gap-1 text-xs whitespace-nowrap"
                      title={feature}
                    >
                      <span>{abbreviateFeature(feature)}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(index)}
                        className="text-red-500 hover:text-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <select
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    className="flex-1 bg-black-darker text-black-dark font-medium p-2 rounded text-sm"
                  >
                    <option value="" className="text-black-dark bg-white">
                      Select a feature
                    </option>
                    {AVAILABLE_FEATURES.filter(
                      (feature) => !features.includes(feature)
                    ).map((feature) => (
                      <option
                        key={feature}
                        value={feature}
                        className="text-black-dark bg-white"
                      >
                        {feature}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="bg-gold-soft text-black-dark px-3 py-1 rounded hover:bg-gold-hover whitespace-nowrap text-sm"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="md:col-span-2 flex justify-center gap-4 mt-2 pt-2 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="bg-black-light text-white-ivory px-6 py-2.5 rounded hover:bg-opacity-80 text-sm font-medium min-w-[100px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gold-soft text-black-dark px-6 py-2.5 rounded hover:bg-gold-hover text-sm font-medium min-w-[100px]"
            >
              Update
            </button>
          </div>
        </form>

        {showConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-black-dark p-6 rounded-lg w-full max-w-sm">
              <h3 className="text-xl text-gold-soft mb-4">Confirm Update</h3>
              <p className="text-white-ivory mb-6">
                Are you sure you want to update the suite &ldquo;{suite.name}
                &rdquo;?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="bg-black-light text-white-ivory px-6 py-2.5 rounded hover:bg-opacity-80 text-sm font-medium min-w-[100px]"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowConfirm(false);
                    formik.submitForm();
                    alert("Suite updated successfully!");
                  }}
                  className="bg-gold-soft text-black-dark px-6 py-2.5 rounded hover:bg-gold-hover text-sm font-medium min-w-[100px]"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
