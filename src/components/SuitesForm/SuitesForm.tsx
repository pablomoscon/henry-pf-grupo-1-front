"use client";
import { useFormik } from "formik";
import { suitesSchema } from "../../helpers/validations";
import { registerRoom } from "@/services/roomService";
import CustomFileUpload from "../CustomFileUpload/CustomFileUpload";

const SuitesForm = () => {
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
      image: "",
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
      console.log("Form submitted with values:", values);
      actions.setSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const selectedFeatures = Object.entries(values.features)
        .filter(([, isSelected]) => isSelected)
        .map(([feature]) => feature);

      const formattedData = {
        name: values.name,
        description: values.description,
        img: values.image,
        features: selectedFeatures,
        number_of_cats: Number(values.numberOfCats),
        price: Number(values.price),
      };

      console.log("Suite created successfully:", formattedData);

      const res = await registerRoom(formattedData);
      if (!res.message) {
        alert("Registered!");
      } else {
        alert(res.message);
      }
      actions.resetForm();
      actions.setSubmitting(false);
    },
  });

  return (
    <div className="flex items-center justify-center mt-2">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="w-full max-w-lg mx-auto p-3 rounded-lg shadow-md space-y-2"
        style={{ background: "var(--black-dark)" }}
      >
        <h2 style={{ color: "var(--gold-soft)" }}>Create Suite</h2>

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
              errors.name && touched.name ? "border-red-500" : "border-gray-600"
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
        </div>

        <div className="space-y-3">
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: "var(--white-ivory)" }}
          >
            Suite Features
          </label>
          <div className="grid grid-cols-2 gap-4">
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
                    className={`flex items-center space-x-3 p-2 rounded-lg border-2 
                      cursor-pointer select-none transition-all duration-200 w-full
                      ${
                        values.features[id as keyof typeof values.features]
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                  >
                    <span className="text-xl">{icon}</span>
                    <span
                      className="text-sm"
                      style={{ color: "var(--white-ivory)" }}
                    >
                      {label}
                    </span>
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
            className="mt-1 block w-full rounded-md border p-2 border-gray-600 focus:outline-none focus:ring-2"
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
              className="mt-1 block w-full rounded-md border p-2 pl-6 border-gray-600 focus:outline-none focus:ring-2"
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

        <button
          type="submit"
          className="button_gold w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create Suite"}
        </button>
      </form>
    </div>
  );
};

export default SuitesForm;
