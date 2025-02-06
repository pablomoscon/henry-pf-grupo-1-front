"use client";
import { useFormik } from "formik";
import { loginSchema } from "../../helpers/validations";
import Link from "next/link";
import { userLogin } from "../../services/userServices";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { UserContext } from "@/contexts/userContext";
import { googleAuth } from "@/services/authServices";

const LoginForm = () => {
  const router = useRouter();
  const { setUser } = useContext(UserContext);

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
      try {
        const res = await userLogin(values);

        if (res.success) {
          setUser(res);
          alert("Login successful");
          router.push("/");
        } else {
          alert("Login failed. Please check your credentials.");
          actions.resetForm();
          actions.setSubmitting(false);
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("Connection error. Please try again later.");
      } finally {
        actions.setSubmitting(false);
      }
    },
  });

  const handleGoogleLogin = async () => {
    try {
      await googleAuth();
    } catch (error) {
      console.error("Failed to initialize Google login:", error);
      alert("Failed to connect with Google. Please try again.");
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center bg-black-dark">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="w-full max-w-md mx-auto p-6 rounded-lg shadow-md space-y-3"
        style={{ background: "var(--black-dark)" }}
      >
        <h2 className="text-2xl mb-4" style={{ color: "var(--gold-soft)" }}>
          Sign In
        </h2>

        <div className="space-y-3">
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
        </div>

        <div className="flex flex-col items-center gap-3 mt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="button_gold w-full py-2.5 text-lg"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
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

          <div className="flex items-center gap-3 mt-3">
            <p className="text-sm" style={{ color: "var(--white-ivory)" }}>
              Not registered yet?
            </p>
            <Link href="/register">
              <button type="button" className="button_green py-2 px-6">
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
