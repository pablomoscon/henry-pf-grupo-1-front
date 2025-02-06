import { IBook } from "../interfaces/IBook";
import dayjs from "dayjs";

export const validateBook = (
  input: IBook,
  validateEmptyFields = false
): { [key: string]: string } => {
  const errors: { [key: string]: string } = {}; // Cambiamos el tipo de 'errors'

  if (validateEmptyFields) {
    if (!input.checkInDate) {
      errors.checkInDate = "Check In is required";
    }

    if (!input.checkOutDate) {
      errors.checkOutDate = "Check Out is required";
    }

    if (input.checkInDate && input.checkOutDate) {
      const checkIn = dayjs(input.checkInDate);
      const checkOut = dayjs(input.checkOutDate);

      if (!checkOut.isAfter(checkIn)) {
        errors.checkOutDate = "Check Out must be after Check In";
      }
    }

    if (!input.catsIds || input.catsIds.length === 0) {
      errors.catsIds = "You must select at least one kitty.";
    } else if (
      input.numCat !== undefined &&
      input.catsIds.length > input.numCat
    ) {
      errors.catsIds = `You can select a maximum of ${input.numCat} kitty(ies).`;
    }
  }

  return errors;
};
