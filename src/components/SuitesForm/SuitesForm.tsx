"use client";
import { useFormik } from "formik";
import { suitesSchema } from "../../helpers/validations";
import { registerRoom } from "@/services/roomService";
import CustomFileUpload from "../CustomFileUpload/CustomFileUpload";
import Image from "next/image";
import { useContext } from "react";
import { UserContext } from "@/contexts/userContext";
import { IRoom } from "@/interfaces/IRoom";

const SuitesForm = () => {
  const { user } = useContext(UserContext);
  const token = user?.response?.token;

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: "",
      image: null,
      description: "",
      features: {
        hidingPlace: false,
        hammocks: false,
        scratchers: false,
        suspensionBridges: false,
      },
      numberOfCats: "",
      price: "",
    },
    validationSchema: suitesSchema,
    onSubmit: async (values, actions) => {
      if (!token) {
        alert("Please log in to create a suite.");
        return;
      }

      if (!values.image || !("size" in values.image)) {
        alert("Please select an image for the suite");
        return;
      }

      console.log("Form submitted with values:", values);
      actions.setSubmitting(true);

      const selectedFeatures = Object.entries(values.features)
        .filter(([, isSelected]) => isSelected)
        .map(([feature]) => feature);

      const formattedData: IRoom = {
        name: values.name,
        description: values.description,
        img: values.image,
        features: selectedFeatures,
        number_of_cats: Number(values.numberOfCats),
        price: Number(values.price),
      };

      try {
        const res = await registerRoom(formattedData, token);
        if (!res.message) {
          alert("Suite registered successfully!");
          actions.resetForm();
        } else {
          alert(res.message);
        }
      } catch (error) {
        console.error("Error creating suite:", error);
        alert("Failed to create suite. Please try again.");
      } finally {
        actions.setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center bg-black-dark">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="w-full max-w-2xl mx-auto p-6 rounded-lg shadow-md space-y-3"
        style={{ background: "var(--black-dark)" }}
      >
        <h2 className="text-2xl mb-4" style={{ color: "var(--gold-soft)" }}>
          Create Suite
        </h2>

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
              value={values.name}
              onChange={handleChange}
              id="name"
              type="text"
              placeholder="Enter the name of the suite"
              onBlur={handleBlur}
              className={`mt-1 block w-full rounded-md border p-2 ${
                errors.name && touched.name
                  ? "border-red-500"
                  : "border-gray-600"
              } focus:outline-none focus:ring-2`}
              style={{
                backgroundColor: "var(--black-light)",
                color: "var(--white-basic)",
              }}
            />
            {errors.name && touched.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-1"
              style={{ color: "var(--white-ivory)" }}
            >
              Description
            </label>
            <input
              value={values.description}
              onChange={handleChange}
              id="description"
              type="text"
              placeholder="Enter the description"
              onBlur={handleBlur}
              className="mt-1 block w-full rounded-md border p-2 border-gray-600 focus:outline-none focus:ring-2"
              style={{
                backgroundColor: "var(--black-light)",
                color: "var(--white-basic)",
              }}
            />
            {errors.description && touched.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          <div>
            <CustomFileUpload
              onFileSelect={(file) => setFieldValue("image", file)}
              error={errors.image}
              touched={touched.image}
              label="Upload Image"
            />
            {values.image && "size" in values.image && (
              <div className="mt-2 relative w-20 h-20">
                <Image
                  src={URL.createObjectURL(values.image as File)}
                  alt="Selected suite photo"
                  fill
                  sizes="80px"
                  className="object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: "var(--white-ivory)" }}
            >
              Suite Features
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "hidingPlace", label: "Hiding Place", icon: "🏠" },
                { id: "hammocks", label: "Hammocks", icon: "🌅" },
                { id: "scratchers", label: "Scratchers", icon: "🐱" },
                {
                  id: "suspensionBridges",
                  label: "Suspension Bridges",
                  icon: "🌉",
                },
              ].map(({ id, label, icon }) => (
                <div key={id} className="relative flex items-start">
                  <div className="flex items-center h-6">
                    <input
                      type="checkbox"
                      id={id}
                      name={`features.${id}`}
                      checked={
                        values.features[id as keyof typeof values.features]
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-4 h-4 mr-2"
                    />
                    <label
                      htmlFor={id}
                      className={`flex items-center space-x-3 p-2 rounded-lg
                        cursor-pointer select-none transition-all duration-200 w-full
                        ${
                          values.features[id as keyof typeof values.features]
                            ? "bg-gold-soft/10 text-gold-soft"
                            : "hover:bg-black-light"
                        }`}
                      style={{ color: "var(--white-ivory)" }}
                    >
                      <span className="text-xl">{icon}</span>
                      <span className="text-sm">{label}</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
            {errors.features && touched.features && (
              <p className="mt-1 text-sm text-red-500">
                {errors.features as string}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="numberOfCats"
              className="block text-sm font-medium mb-1"
              style={{ color: "var(--white-ivory)" }}
            >
              Number of cat guests
            </label>
            <input
              value={values.numberOfCats}
              onChange={handleChange}
              id="numberOfCats"
              type="number"
              placeholder="Enter the number of cat guests"
              onBlur={handleBlur}
              className="mt-1 block w-full rounded-md border p-2 border-gray-600 focus:outline-none focus:ring-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              style={{
                backgroundColor: "var(--black-light)",
                color: "var(--white-basic)",
              }}
            />
            {errors.numberOfCats && touched.numberOfCats && (
              <p className="mt-1 text-sm text-red-500">{errors.numberOfCats}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium mb-1"
              style={{ color: "var(--white-ivory)" }}
            >
              Price
            </label>
            <div className="relative">
              <span
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
                style={{ color: "var(--white-basic)" }}
              >
                $
              </span>
              <input
                value={values.price}
                onChange={handleChange}
                id="price"
                type="number"
                placeholder="Enter the price of the suite"
                onBlur={handleBlur}
                className="mt-1 block w-full rounded-md border p-2 pl-6 border-gray-600 focus:outline-none focus:ring-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                style={{
                  backgroundColor: "var(--black-light)",
                  color: "var(--white-basic)",
                }}
              />
            </div>
            {errors.price && touched.price && (
              <p className="mt-1 text-sm text-red-500">{errors.price}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="button_gold w-full py-2.5 text-lg mt-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create Suite"}
        </button>
      </form>
    </div>
  );
};

export default SuitesForm;
