import { IReview } from "@/interfaces/IReview";

export const fetchReviews = async (): Promise<IReview[]> => {
  try {
    const response = await fetch("http://localhost:3000/reviews", {
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
