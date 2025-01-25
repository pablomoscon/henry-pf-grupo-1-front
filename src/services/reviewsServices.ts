import { IReview } from "@/interfaces/IReview";

export const fetchReviews = async (): Promise<IReview[]> => {
  // Simulación de un "fetch" al backend con datos mockeados
  const mockReviews: IReview[] = [
    {
      nameUser: "John",
      textResenia:
        "The service was absolutely amazing! Everyone was super friendly and helpful and they went above and beyond to meet my expectations. I’ll definitely come back again.",
      calification: 5,
    },
    {
      nameUser: "Emily",
      textResenia:
        "It was a good experience overall. The staff was polite, but the waiting time was a bit longer than expected. Still, I’d recommend it to others.",
      calification: 4,
    },
    {
      nameUser: "Michael",
      textResenia:
        "The experience was okay, but I believe there is room for improvement in terms of organization and communication. It felt a bit rushed.",
      calification: 3,
    },
    {
      nameUser: "Sophia",
      textResenia:
        "I’m beyond satisfied with the attention to detail and the quality of the service provided. It was such a smooth process from start to finish!",
      calification: 5,
    },
    {
      nameUser: "Daniel",
      textResenia:
        "The service met my expectations, nothing out of the ordinary but still a good experience overall. I appreciate their effort.",
      calification: 4,
    },
  ];

  return new Promise((resolve) => setTimeout(() => resolve(mockReviews), 1000)); // Simula 1s de delay
};

export const getReviews = async (): Promise<IReview[]> => {
  const response = await fetch("/api/reviews");
  if (!response.ok) {
    throw new Error("Failed to fetch reviews");
  }
  return response.json();
};
