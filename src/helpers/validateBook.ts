import { IBook } from "../interfaces/IBook";

export const validateBook = (
  input: IBook,
  validateEmptyFields = false
): IBook => {
  const errors: IBook = {};

  if (validateEmptyFields) {
    if (!input.checkInDate) {
      errors.checkInDate = "Ckeck In is Required";
    }
    if (!input.checkOutDate) {
      errors.checkOutDate = "Ckeck Out is Required";
    }
  }

  return errors;
};
