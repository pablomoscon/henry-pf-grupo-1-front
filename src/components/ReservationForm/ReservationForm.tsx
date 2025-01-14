"use client";
import { useFormik } from "formik";
import { reservationSchema } from "../../helpers/validations";
import { CalendarIcon } from "../Icons/CalendarIcon";

const ReservationForm = () => {
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
      selectedSuite: "",
      checkIn: "",
      checkOut: "",
      fullName: "",
      customerId: "",
      numberOfCats: 1,
      cats: [{ name: "", isNew: false }],
    },
    validationSchema: reservationSchema,
    onSubmit: async (values, actions) => {
      console.log("Reservation data:", values);
      actions.setSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      actions.resetForm();
      actions.setSubmitting(false);
    },
  });

  return (
    <div className="flex items-center justify-center mt-8">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="w-full max-w-2xl mx-auto p-6 rounded-lg shadow-md space-y-8"
        style={{ background: "var(--black-dark)" }}
      >
        <div className="space-y-2">
          <h2
            className="text-xl font-semibold text-left"
            style={{ color: "var(--gold-soft)" }}
          >
            Selected Suite
          </h2>
          <div className="flex justify-between items-center">
            <span className="text-lg" style={{ color: "var(--white-ivory)" }}>
              {values.selectedSuite || "5 Star Suite"}
            </span>
            <span className="text-lg" style={{ color: "var(--white-ivory)" }}>
              $30 USD / day
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <h2
            className="text-xl font-semibold text-left"
            style={{ color: "var(--gold-soft)" }}
          >
            Date
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="checkIn"
                className="block text-sm font-medium mb-1"
                style={{ color: "var(--white-ivory)" }}
              >
                Check In
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  id="checkIn"
                  type="date"
                  value={values.checkIn}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`pl-10 w-full p-2 rounded-md border ${
                    errors.checkIn && touched.checkIn
                      ? "border-red-500"
                      : "border-gray-600"
                  }`}
                  style={{
                    backgroundColor: "var(--black-light)",
                    color: "var(--white-basic)",
                  }}
                />
              </div>
              {errors.checkIn && touched.checkIn && (
                <p className="mt-1 text-sm text-red-500">{errors.checkIn}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="checkOut"
                className="block text-sm font-medium mb-1"
                style={{ color: "var(--white-ivory)" }}
              >
                Check Out
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  id="checkOut"
                  type="date"
                  value={values.checkOut}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`pl-10 w-full p-2 rounded-md border ${
                    errors.checkOut && touched.checkOut
                      ? "border-red-500"
                      : "border-gray-600"
                  }`}
                  style={{
                    backgroundColor: "var(--black-light)",
                    color: "var(--white-basic)",
                  }}
                />
              </div>
              {errors.checkOut && touched.checkOut && (
                <p className="mt-1 text-sm text-red-500">{errors.checkOut}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center py-4 border-t border-b border-gray-600">
          <span
            className="text-lg font-semibold"
            style={{ color: "var(--white-ivory)" }}
          >
            Reserve Total
          </span>
          <span className="text-lg" style={{ color: "var(--gold-soft)" }}>
            $90 USD
          </span>
        </div>

        <div className="space-y-4">
          <h2
            className="text-xl font-semibold text-left"
            style={{ color: "var(--gold-soft)" }}
          >
            Customer Data
          </h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium mb-1"
                style={{ color: "var(--white-ivory)" }}
              >
                First and Last Name
              </label>
              <input
                id="fullName"
                type="text"
                value={values.fullName || ""}
                onChange={handleChange}
                className="w-full p-2 rounded-md border border-gray-600"
                style={{
                  backgroundColor: "var(--black-light)",
                  color: "var(--white-basic)",
                }}
              />
            </div>
            <div>
              <label
                htmlFor="customerId"
                className="block text-sm font-medium mb-1"
                style={{ color: "var(--white-ivory)" }}
              >
                ID
              </label>
              <input
                id="customerId"
                type="text"
                value={values.customerId || ""}
                onChange={handleChange}
                className="w-full p-2 rounded-md border border-gray-600"
                style={{
                  backgroundColor: "var(--black-light)",
                  color: "var(--white-basic)",
                }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2
            className="text-xl font-semibold text-left"
            style={{ color: "var(--gold-soft)" }}
          >
            Kitty Cats
          </h2>
          <div className="space-y-4">
            {values.cats.map((cat, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex-1">
                  <label
                    htmlFor={`cats.${index}.name`}
                    className="block text-sm font-medium mb-1"
                    style={{ color: "var(--white-ivory)" }}
                  >
                    Kitty Cat Name
                  </label>
                  <input
                    id={`cats.${index}.name`}
                    name={`cats.${index}.name`}
                    type="text"
                    value={cat.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full p-2 rounded-md border border-gray-600"
                    style={{
                      backgroundColor: "var(--black-light)",
                      color: "var(--white-basic)",
                    }}
                  />
                </div>
                <button
                  type="button"
                  className="button_green mt-6"
                  onClick={() => {
                    const newCat = { name: "", isNew: true };
                    const newCats = [...values.cats, newCat];
                    handleChange({
                      target: { name: "cats", value: newCats },
                    });
                  }}
                >
                  New
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="button_gold w-full md:w-1/2"
          >
            {isSubmitting ? "Processing..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;
