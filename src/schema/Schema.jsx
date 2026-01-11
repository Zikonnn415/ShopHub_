import * as yup from "yup";

export const LoginSchema = yup
  .object({
    email: yup
      .string().email()
      .required("Email is required"),
  
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(30, "Password must not exceed 30 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[@$!%*?&#]/, "Password must contain at least one special character"),
  })
  .required();

