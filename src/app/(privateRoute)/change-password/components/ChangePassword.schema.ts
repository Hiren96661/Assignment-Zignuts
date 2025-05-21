import * as yup from "yup";

export const ChangePasswordSchema = yup.object({
  currentPassword: yup
    .string()
    .required("Current password is required")
    .min(6, "Current password must be at least 6 characters"),
  password: yup
    .string()
    .required("New password is required")
    .min(6, "New password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});
