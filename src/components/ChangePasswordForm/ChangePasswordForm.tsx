"use client";
import { useFormik } from "formik";
import { changePasswordSchema } from "../../helpers/validations";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { changePassword } from "../../services/userServices";
import { useEffect, useState } from "react";

const ChangePasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get("token");

    const pathParts = pathname.split("/");
    const id = pathParts[pathParts.length - 1];

    setUserId(id);
    setToken(token);
  }, [searchParams, pathname]);

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
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit: async (values, actions) => {
      actions.setSubmitting(true);
      try {
        await changePassword(
          {
            newPassword: values.newPassword,
            confirmPassword: values.confirmNewPassword,
          },
          userId!,
          token!
        );

        alert("Password changed successfully!");
        router.push("/login");
      } catch (error) {
        if (error instanceof Error) {
          console.error("Password change error:", error);
          alert(error.message);
        } else {
          console.error("Unexpected error:", error);
          alert("An unexpected error occurred");
        }
      } finally {
        actions.setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center py-24 px-4 bg-black-dark">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="w-full max-w-2xl mx-auto p-6 rounded-lg shadow-md space-y-4"
        style={{ background: "var(--black-dark)" }}
      >
        <h2 style={{ color: "var(--gold-soft)" }}>Change Password</h2>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium mb-1"
              style={{ color: "var(--white-ivory)" }}
            >
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              value={values.newPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`mt-1 block w-full rounded-md border p-2 ${
                errors.newPassword && touched.newPassword
                  ? "border-red-500"
                  : "border-gray-600"
              } focus:outline-none focus:ring-2`}
              style={{
                backgroundColor: "var(--black-light)",
                color: "var(--white-basic)",
              }}
            />
            {errors.newPassword && touched.newPassword && (
              <p className="mt-1 text-sm text-red-500">{errors.newPassword}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmNewPassword"
              className="block text-sm font-medium mb-1"
              style={{ color: "var(--white-ivory)" }}
            >
              Confirm New Password
            </label>
            <input
              id="confirmNewPassword"
              type="password"
              value={values.confirmNewPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`mt-1 block w-full rounded-md border p-2 ${
                errors.confirmNewPassword && touched.confirmNewPassword
                  ? "border-red-500"
                  : "border-gray-600"
              } focus:outline-none focus:ring-2`}
              style={{
                backgroundColor: "var(--black-light)",
                color: "var(--white-basic)",
              }}
            />
            {errors.confirmNewPassword && touched.confirmNewPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmNewPassword}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="button_gold w-full"
        >
          {isSubmitting ? "Changing Password..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
