import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// 5 caracteres, 1 letra mayúscula, 1 letra minúscula y 1 número

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .trim()
    .required("Required"),
  password: yup.string().required("Required"),
});

export const suitesSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Name should have at least 3 characters")
    .max(50, "Name should not exceed 50 characters")
    .trim()
    .required("Required"),
  description: yup
    .string()
    .min(10, "Description should have at least 10 characters")
    .max(500, "Description should not exceed 500 characters")
    .trim()
    .required("Required"),
  features: yup
    .object()
    .shape({
      hidingPlace: yup.boolean(),
      hammocks: yup.boolean(),
      scratchers: yup.boolean(),
      suspensionBridges: yup.boolean(),
    })
    .test(
      "at-least-one-feature",
      "Please select at least one feature",
      (value) => Object.values(value || {}).some(Boolean)
    ),
  numberOfCats: yup
    .number()
    .positive("Minimum 1")
    .integer("Must be an integer number")
    .max(10, "Maximum 10 cats per suite")
    .required("Required"),
  price: yup
    .number()
    .positive("At least 1")
    .max(1000, "Price cannot exceed 1000")
    .required("Required"),
});

export const registerSchema = yup.object().shape({
  customerId: yup
    .string()
    .matches(/^\d+$/, "Only numbers are allowed")
    .required("Required"),
  name: yup.string().required("Required"),
  address: yup.string().required("Required"),
  phone: yup
    .string()
    .matches(/^\d+$/, "Only numbers are allowed")
    .required("Required"),
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, {
      message:
        "Please enter at least 5 characters, 1 upper case letter, 1 lower case letter and 1 number",
    })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Required"),
});

export const newCatSchema = yup.object().shape({
  catName: yup.string().required("Required"),
  dateOfBirth: yup.string().required("Required"),
  isNeutered: yup.boolean(),
  weight: yup
    .string()
    .matches(/^\d+$/, "Only numbers are allowed")
    .required("Required"),
  personality: yup.string(),
  getsAlongWithCats: yup.string(),
  food: yup.string(),
  medication: yup.string(),
  veterinarianBehavior: yup.string(),
  vaccinations: yup.object().shape({
    rabies: yup.boolean(),
    tripleFeline: yup.boolean(),
    fivFelv: yup.boolean(),
  }),
  catPhoto: yup.string(),
});

export const reservationSchema = yup.object().shape({
  selectedSuite: yup.string().required("Please select a suite"),
  checkIn: yup.date().required("Check-in date is required"),
  checkOut: yup
    .date()
    .required("Check-out date is required")
    .min(yup.ref("checkIn"), "Check-out date must be after check-in date"),
  numberOfCats: yup
    .number()
    .required("Required")
    .positive("Must be at least 1")
    .integer("Must be a whole number")
    .max(4, "Maximum 4 cats"),
  cats: yup.array().of(
    yup.object().shape({
      name: yup.string().required("Cat name is required"),
      isNew: yup.boolean(),
    })
  ),
});
