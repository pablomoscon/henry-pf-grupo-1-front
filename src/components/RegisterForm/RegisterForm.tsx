"use client";
import { useFormik } from "formik";
import { registerSchema } from "../../helpers/validations";
import { userRegister } from "../../services/userServices";
import { useRouter } from "next/navigation";
import { googleAuth } from "@/services/authServices";

const RegisterForm = () => {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      await googleAuth();
    } catch (error) {
      console.error("Failed to initialize Google login:", error);
      alert("Failed to connect with Google. Please try again.");
    }
  };

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
      name: "",
      address: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values, actions) => {
      actions.setSubmitting(true);
      const formattedData = {
        customerId: values.customerId,
        name: values.name,
        address: values.address,
        phone: values.phone,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      };
      try {
        const res = await userRegister(formattedData);
        if (!res.message) {
          alert("Registration successful!");
          router.push("/login");
        } else {
          alert(res.message || "Registration failed. Please try again.");
          actions.resetForm();
          actions.setSubmitting(false);
        }
      } catch (error) {
        console.error("Registration error:", error);
        alert("Connection error. Please try again later.");
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
          Customer Data
        </h2>

        <div className="space-y-3">
          <div>
            <label
              htmlFor="customerId"
              className="block text-sm font-medium mb-1"
              style={{ color: "var(--white-ivory)" }}
            >
              DNI
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
              htmlFor="name"
              className="block text-sm font-medium mb-1"
              style={{ color: "var(--white-ivory)" }}
            >
              First and last name
            </label>
            <input
              id="name"
              type="text"
              value={values.name}
              onChange={handleChange}
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

        <div className="flex flex-col items-center gap-3 mt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="button_gold w-full py-2.5 text-lg"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>

          <div className="w-full flex items-center my-3">
            <div className="flex-1 border-t border-gray-600"></div>
            <span className="px-3 text-gray-400">or</span>
            <div className="flex-1 border-t border-gray-600"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-600 rounded-md hover:bg-gray-700 transition-colors"
            style={{ background: "var(--black-light)" }}
          >
            <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
            <span style={{ color: "var(--white-ivory)" }}>
              Continue with Google
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
