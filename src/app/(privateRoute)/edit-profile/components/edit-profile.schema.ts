import * as yup from "yup";

export const EditProfileSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup
        .string()
        .email("Invalid email")
        .required("Email is required"),
    mobileNumber: yup
        .string()
        .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
        .required("Mobile number is required"),
});
