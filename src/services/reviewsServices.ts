import { IReview, IReviewCreate } from "@/interfaces/IReview";
import { API_URL } from "../envs";

export const fetchReviews = async (): Promise<IReview[]> => {
  try {
    const response = await fetch(`${API_URL}/reviews`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch reviews");
    }

    const reviews: IReview[] = await response.json();
    return reviews;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

export const createReview = async (
  reviewData: IReviewCreate,
  token: string
): Promise<IReview> => {
  try {
    const response = await fetch(`${API_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
      throw new Error("Failed to create review");
    }

    const review: IReview = await response.json();
    return review;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
};
