import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// 5 caracteres, 1 letra mayúscula, 1 letra minúscula y 1 número

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .trim()
    .required("Required"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, {
      message:
        "Please enter at least 5 characters, 1 upper case letter, 1 lower case letter and 1 number",
    })
    .required("Required"),
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
  features: yup.object().shape({
    hidingPlace: yup.boolean().required("Required"),
    hammocks: yup.boolean().required("Required"),
    scratchers: yup.boolean().required("Required"),
    suspensionBridges: yup.boolean().required("Required"),
  }),
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
  firstName: yup
    .string()
    .min(2, "First name should have at least 2 characters")
    .max(50, "First name should not exceed 50 characters")
    .trim()
    .required("Required"),
  lastName: yup
    .string()
    .min(2, "Last name should have at least 2 characters")
    .max(50, "Last name should not exceed 50 characters")
    .trim()
    .required("Required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .trim()
    .required("Required"),
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
