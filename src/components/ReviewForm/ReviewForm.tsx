"use client";
import { useFormik } from "formik";
import { reviewSchema } from "@/helpers/validations";
import { FaPaw } from "react-icons/fa";
import { useContext, useEffect } from "react";
import { UserContext } from "@/contexts/userContext";
import { IReviewCreate } from "@/interfaces/IReview";
import { createReview } from "@/services/reviewsServices";
import { useRouter } from "next/navigation";
import { getUserReservations } from "@/services/bookService";
import { IReservation } from "@/interfaces/IReserve";

const StarRating = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) => {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className={`transition-colors duration-200 ${
            star <= value
              ? "text-gold-soft hover:text-gold-dark"
              : "text-gray-400 hover:text-gold-soft"
          }`}
        >
          <FaPaw className="text-2xl" />
        </button>
      ))}
    </div>
  );
};

const ReviewForm = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const token = user?.response?.token;
  const userId = user?.response?.user?.id;

  useEffect(() => {
    const checkUserReservations = async () => {
      if (!userId || !token) return;

      try {
        const reservations = await getUserReservations(userId, token);
        const hasFinishedReservation = reservations.some(
          (reservation: IReservation) => reservation.status === "Completed"
        );

        if (!hasFinishedReservation) {
          alert("You need to have a finished reservation to write a review");
          router.push("/");
        }
      } catch (error) {
        console.error("Error checking reservations:", error);
        router.push("/");
      }
    };

    checkUserReservations();
  }, [userId, token, router]);

  const formik = useFormik({
    initialValues: {
      textBody: "",
      rating: 0,
    },
    validationSchema: reviewSchema,
    onSubmit: async (values, { resetForm }) => {
      if (!token) {
        alert("Please log in to submit a review");
        return;
      }

      try {
        const reviewData: IReviewCreate = {
          textBody: values.textBody,
          rating: values.rating,
        };

        await createReview(reviewData, token);
        alert("Review submitted successfully!");
        resetForm();
        router.push("/");
      } catch (error) {
        console.error("Error submitting review:", error);
        alert("Failed to submit review. Please try again.");
      }
    },
  });

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center bg-black-dark">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-2xl mx-auto p-6 rounded-lg shadow-md space-y-6"
        style={{ background: "var(--black-dark)" }}
      >
        <h2 className="text-2xl mb-4" style={{ color: "var(--gold-soft)" }}>
          Review Your Stay
        </h2>

        <div className="space-y-6">
          <div className="space-y-2">
            <label
              className="block text-sm font-medium"
              style={{ color: "var(--white-ivory)" }}
            >
              Overall Rating
            </label>
            <StarRating
              value={formik.values.rating}
              onChange={(value) => formik.setFieldValue("rating", value)}
            />
            {formik.touched.rating && formik.errors.rating && (
              <p className="text-red-500 text-sm">{formik.errors.rating}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="textBody"
              className="block text-sm font-medium"
              style={{ color: "var(--white-ivory)" }}
            >
              Your Experience
            </label>
            <textarea
              id="textBody"
              rows={4}
              {...formik.getFieldProps("textBody")}
              className="mt-1 block w-full rounded-md border p-2 border-gray-600 focus:outline-none focus:ring-2"
              style={{
                backgroundColor: "var(--black-light)",
                color: "var(--white-basic)",
              }}
            />
            {formik.touched.textBody && formik.errors.textBody && (
              <p className="text-red-500 text-sm">{formik.errors.textBody}</p>
            )}
          </div>

          <div className="flex justify-center pt-6">
            <button type="submit" className="button_gold w-full py-2.5 text-lg">
              Submit Review
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
