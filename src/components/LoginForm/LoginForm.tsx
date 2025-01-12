"use client";
import { useFormik } from "formik";
import { loginSchema } from "../../helpers/validations";
import Link from "next/link";

const LoginForm = () => {
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
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, actions) => {
      actions.setSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Sign in successful", values);
      actions.resetForm();
      actions.setSubmitting(false);
    },
  });

  return (
    <div className="flex items-center justify-center mt-8">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="w-full max-w-md mx-auto p-6 rounded-lg shadow-md"
        style={{ background: "var(--black-dark)" }}
      >
        <h2 style={{ color: "var(--gold-soft)" }}>Sign In</h2>

        <div className="mb-4">
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
            placeholder="Enter your email"
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

        <div className="mb-6">
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
            placeholder="Enter your password"
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

        <div className="flex flex-col items-center gap-4">
          <button type="submit" disabled={isSubmitting} className="button_gold">
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>

          <div className="text-center">
            <p
              className="block text-sm mb-2"
              style={{ color: "var(--white-ivory)" }}
            >
              Not registered yet?
            </p>
            <Link href="/register" className="block">
              <button type="button" className="button_green">
                Register
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
