"use client";

import { useEffect, useState } from "react";
import { IReview } from "@/interfaces/IReview";
import { fetchReviews } from "@/services/reviewsServices";
import { renderPaws } from "../RenderPaws/RenderPaws";

const Reviews = () => {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReviews = async () => {
      setLoading(true);
      try {
        const data = await fetchReviews();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  return (
    <section className="py-8 px-4 bg-white">
      <h2 className="text-2xl text-black font-bold text-center mb-6">
        Customers Reviews
      </h2>
      {loading ? (
        <p className="text-center text-gray-500">Loading reviews...</p>
      ) : reviews.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-4">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-between w-52 h-40 p-4 text-center"
            >
              <p className="text-black text-sm font-bold h-6 flex items-center justify-center">
                {review.user.name}
              </p>

              <p className="text-gray-600 text-sm h-16 overflow-hidden">
                {review.textBody && review.textBody.length > 80
                  ? review.textBody.slice(0, 80) + "..."
                  : review.textBody}
              </p>

              <div className="h-3 flex items-center">
                {renderPaws(review.rating)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No reviews available.</p>
      )}
    </section>
  );
};

export default Reviews;
