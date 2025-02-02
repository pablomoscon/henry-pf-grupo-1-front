export interface IReview {
  id: string;
  textBody: string;
  rating: number;
  deleted_at: string | null;
  user: {
    id: string;
    name: string;
  };
}

export interface IReviewCreate {
  textBody: string;
  rating: number;
}
