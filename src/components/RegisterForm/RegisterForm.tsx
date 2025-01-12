"use client";
import { useFormik } from "formik";
import { registerSchema } from "../../helpers/validations";

const RegisterForm = () => {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      customerId: "",
      fullName: "",
      address: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      catName: "",
      dateOfBirth: "",
      isNeutered: false,
      weight: "",
      personality: "",
      getsAlongWithCats: "unsure",
      food: "",
      medication: "",
      veterinarianBehavior: "",
      vaccinations: {
        rabies: false,
        tripleFeline: false,
        fivFelv: false,
      },
      catPhoto: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values, actions) => {
      actions.setSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const formattedData = {
        customer: {
          customerId: values.customerId,
          fullName: values.fullName,
          address: values.address,
          phone: values.phone,
          email: values.email,
          password: values.password,
        },
        cat: {
          name: values.catName,
          dateOfBirth: values.dateOfBirth,
          isNeutered: values.isNeutered,
          weight: values.weight,
          personality: values.personality,
          getsAlongWithCats: values.getsAlongWithCats,
          food: values.food,
          medication: values.medication,
          veterinarianBehavior: values.veterinarianBehavior,
          vaccinations: Object.entries(values.vaccinations)
            .filter(([, isSelected]) => isSelected)
            .map(([vaccineName]) => vaccineName),
          photo: values.catPhoto,
        },
      };

      console.log("Registration data:", formattedData);
      actions.resetForm();
      actions.setSubmitting(false);
    },
  });

  return (
    <div className="flex items-center justify-center mt-2">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="w-full max-w-2xl mx-auto p-6 rounded-lg shadow-md space-y-4"
        style={{ background: "var(--black-dark)" }}
      >
        <h2 style={{ color: "var(--gold-soft)" }}>Customer Data</h2>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="customerId"
              className="block text-sm font-medium mb-1"
              style={{ color: "var(--white-ivory)" }}
            >
              Customer ID
            </label>
            <input
              id="customerId"
              type="text"
              value={values.customerId}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`mt-1 block w-full rounded-md border p-2 ${
                errors.customerId && touched.customerId
                  ? "border-red-500"
                  : "border-gray-600"
              } focus:outline-none focus:ring-2`}
              style={{
                backgroundColor: "var(--black-light)",
                color: "var(--white-basic)",
              }}
            />
            {errors.customerId && touched.customerId && (
              <p className="mt-1 text-sm text-red-500">{errors.customerId}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium mb-1"
              style={{ color: "var(--white-ivory)" }}
            >
              First and last name
            </label>
            <input
              id="fullName"
              type="text"
              value={values.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`mt-1 block w-full rounded-md border p-2 ${
                errors.fullName && touched.fullName
                  ? "border-red-500"
                  : "border-gray-600"
              } focus:outline-none focus:ring-2`}
              style={{
                backgroundColor: "var(--black-light)",
                color: "var(--white-basic)",
              }}
            />
            {errors.fullName && touched.fullName && (
              <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium mb-1"
              style={{ color: "var(--white-ivory)" }}
            >
              Address
            </label>
            <input
              id="address"
              type="text"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`mt-1 block w-full rounded-md border p-2 ${
                errors.address && touched.address
                  ? "border-red-500"
                  : "border-gray-600"
              } focus:outline-none focus:ring-2`}
              style={{
                backgroundColor: "var(--black-light)",
                color: "var(--white-basic)",
              }}
            />
            {errors.address && touched.address && (
              <p className="mt-1 text-sm text-red-500">{errors.address}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium mb-1"
              style={{ color: "var(--white-ivory)" }}
            >
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`mt-1 block w-full rounded-md border p-2 ${
                errors.phone && touched.phone
                  ? "border-red-500"
                  : "border-gray-600"
              } focus:outline-none focus:ring-2`}
              style={{
                backgroundColor: "var(--black-light)",
                color: "var(--white-basic)",
              }}
            />
            {errors.phone && touched.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-1"
              style={{ color: "var(--white-ivory)" }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`mt-1 block w-full rounded-md border p-2 ${
                errors.email && touched.email
                  ? "border-red-500"
                  : "border-gray-600"
              } focus:outline-none focus:ring-2`}
              style={{
                backgroundColor: "var(--black-light)",
                color: "var(--white-basic)",
              }}
            />
            {errors.email && touched.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
              style={{ color: "var(--white-ivory)" }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`mt-1 block w-full rounded-md border p-2 ${
                errors.password && touched.password
                  ? "border-red-500"
                  : "border-gray-600"
              } focus:outline-none focus:ring-2`}
              style={{
                backgroundColor: "var(--black-light)",
                color: "var(--white-basic)",
              }}
            />
            {errors.password && touched.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium mb-1"
              style={{ color: "var(--white-ivory)" }}
            >
              Repeat Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`mt-1 block w-full rounded-md border p-2 ${
                errors.confirmPassword && touched.confirmPassword
                  ? "border-red-500"
                  : "border-gray-600"
              } focus:outline-none focus:ring-2`}
              style={{
                backgroundColor: "var(--black-light)",
                color: "var(--white-basic)",
              }}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </div>

        <h2 style={{ color: "var(--gold-soft)", marginTop: "2rem" }}>
          Kitty Cat Data
        </h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="catName"
              className="block text-sm font-medium mb-1"
              style={{ color: "var(--white-ivory)" }}
            >
              Kitty Cat Name
            </label>
            <input
              id="catName"
              type="text"
              value={values.catName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`mt-1 block w-full rounded-md border p-2 ${
                errors.catName && touched.catName
                  ? "border-red-500"
                  : "border-gray-600"
              } focus:outline-none focus:ring-2`}
              style={{
                backgroundColor: "var(--black-light)",
                color: "var(--white-basic)",
              }}
            />
            {errors.catName && touched.catName && (
              <p className="mt-1 text-sm text-red-500">{errors.catName}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="dateOfBirth"
              className="block text-sm font-medium mb-1"
              style={{ color: "var(--white-ivory)" }}
            >
              Date of birth
            </label>
            <input
              id="dateOfBirth"
              type="date"
              value={values.dateOfBirth}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`mt-1 block w-full rounded-md border p-2 ${
                errors.dateOfBirth && touched.dateOfBirth
                  ? "border-red-500"
                  : "border-gray-600"
              } focus:outline-none focus:ring-2`}
              style={{
                backgroundColor: "var(--black-light)",
                color: "var(--white-basic)",
              }}
            />
            {errors.dateOfBirth && touched.dateOfBirth && (
              <p className="mt-1 text-sm text-red-500">{errors.dateOfBirth}</p>
            )}
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: "var(--white-ivory)" }}
            >
              Is it neutered?
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="isNeutered"
                  value="yes"
                  checked={values.isNeutered === true}
                  onChange={() =>
                    handleChange({
                      target: { name: "isNeutered", value: true },
                    })
                  }
                  className="mr-2"
                />
                <span style={{ color: "var(--white-ivory)" }}>Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="isNeutered"
                  value="no"
                  checked={values.isNeutered === false}
                  onChange={() =>
                    handleChange({
                      target: { name: "isNeutered", value: false },
                    })
                  }
                  className="mr-2"
                />
                <span style={{ color: "var(--white-ivory)" }}>No</span>
              </label>
            </div>
          </div>

          <div>
            <label
              htmlFor="weight"
              className="block text-sm font-medium mb-1"
              style={{ color: "var(--white-ivory)" }}
            >
              Weight
            </label>
            <div className="relative">
              <input
                id="weight"
                type="text"
                value={values.weight}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`mt-1 block w-full rounded-md border p-2 pr-8 ${
                  errors.weight && touched.weight
                    ? "border-red-500"
                    : "border-gray-600"
                } focus:outline-none focus:ring-2`}
                style={{
                  backgroundColor: "var(--black-light)",
                  color: "var(--white-basic)",
                }}
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                style={{ color: "var(--white-basic)" }}
              >
                kg
              </span>
            </div>
            {errors.weight && touched.weight && (
              <p className="mt-1 text-sm text-red-500">{errors.weight}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="personality"
              className="block text-sm font-medium mb-1"
              style={{ color: "var(--white-ivory)" }}
            >
              Personality (playful, affectionate, shy, etc.)
            </label>
            <textarea
              id="personality"
              value={values.personality}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`mt-1 block w-full rounded-md border p-2 ${
                errors.personality && touched.personality
                  ? "border-red-500"
                  : "border-gray-600"
              } focus:outline-none focus:ring-2`}
              style={{
                backgroundColor: "var(--black-light)",
                color: "var(--white-basic)",
              }}
            />
            {errors.personality && touched.personality && (
              <p className="mt-1 text-sm text-red-500">{errors.personality}</p>
            )}
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: "var(--white-ivory)" }}
            >
              Does it get along with other cats?
            </label>
            <div className="flex gap-4">
              {["Yes", "No", "Unsure"].map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="radio"
                    name="getsAlongWithCats"
                    value={option.toLowerCase()}
                    checked={values.getsAlongWithCats === option.toLowerCase()}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span style={{ color: "var(--white-ivory)" }}>{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="food"
              className="block text-sm font-medium mb-1"
              style={{ color: "var(--white-ivory)" }}
            >
              What food does it eat?
            </label>
            <textarea
              id="food"
              value={values.food}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`mt-1 block w-full rounded-md border p-2 ${
                errors.food && touched.food
                  ? "border-red-500"
                  : "border-gray-600"
              } focus:outline-none focus:ring-2`}
              style={{
                backgroundColor: "var(--black-light)",
                color: "var(--white-basic)",
              }}
            />
            {errors.food && touched.food && (
              <p className="mt-1 text-sm text-red-500">{errors.food}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="medication"
              className="block text-sm font-medium mb-1"
              style={{ color: "var(--white-ivory)" }}
            >
              Is it taking any medication?
            </label>
            <textarea
              id="medication"
              value={values.medication}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`mt-1 block w-full rounded-md border p-2 ${
                errors.medication && touched.medication
                  ? "border-red-500"
                  : "border-gray-600"
              } focus:outline-none focus:ring-2`}
              style={{
                backgroundColor: "var(--black-light)",
                color: "var(--white-basic)",
              }}
            />
            {errors.medication && touched.medication && (
              <p className="mt-1 text-sm text-red-500">{errors.medication}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="veterinarianBehavior"
              className="block text-sm font-medium mb-1"
              style={{ color: "var(--white-ivory)" }}
            >
              How does it behave when going to the veterinarian?
            </label>
            <textarea
              id="veterinarianBehavior"
              value={values.veterinarianBehavior}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`mt-1 block w-full rounded-md border p-2 ${
                errors.veterinarianBehavior && touched.veterinarianBehavior
                  ? "border-red-500"
                  : "border-gray-600"
              } focus:outline-none focus:ring-2`}
              style={{
                backgroundColor: "var(--black-light)",
                color: "var(--white-basic)",
              }}
            />
            {errors.veterinarianBehavior && touched.veterinarianBehavior && (
              <p className="mt-1 text-sm text-red-500">
                {errors.veterinarianBehavior}
              </p>
            )}
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: "var(--white-ivory)" }}
            >
              Which of the following vaccinations/tests/certificates does your
              cat have?
            </label>
            <div className="space-y-2">
              {[
                { id: "rabies", label: "Rabies" },
                { id: "tripleFeline", label: "Triple feline" },
                { id: "fivFelv", label: "FIV/FELV test" },
              ].map(({ id, label }) => (
                <label key={id} className="flex items-center">
                  <input
                    type="checkbox"
                    name={`vaccinations.${id}`}
                    checked={
                      values.vaccinations[
                        id as keyof typeof values.vaccinations
                      ]
                    }
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span style={{ color: "var(--white-ivory)" }}>{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="catPhoto"
              className="block text-sm font-medium mb-1"
              style={{ color: "var(--white-ivory)" }}
            >
              Upload Photo
            </label>
            <input
              id="catPhoto"
              type="text"
              placeholder="Enter image URL"
              value={values.catPhoto}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`mt-1 block w-full rounded-md border p-2 ${
                errors.catPhoto && touched.catPhoto
                  ? "border-red-500"
                  : "border-gray-600"
              } focus:outline-none focus:ring-2`}
              style={{
                backgroundColor: "var(--black-light)",
                color: "var(--white-basic)",
              }}
            />
            {errors.catPhoto && touched.catPhoto && (
              <p className="mt-1 text-sm text-red-500">{errors.catPhoto}</p>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <button type="button" className="button_green">
            Add New Cat
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="button_gold w-full"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
