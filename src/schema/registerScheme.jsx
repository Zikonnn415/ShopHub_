import * as yup from "yup";

export const RegisterSchema = yup.object
    ({
        firstname: yup
            .string()
            .required("Firstname is required")
            .min(3, "Firstname must be at least 3 characters")
            .max(20, "Firstname must not exceed 20 characters"),

        lastname: yup
            .string()
            .required("Lastname is required")
            .min(3, "Lastname must be at least 3 characters")
            .max(20, "Lastname must not exceed 20 characters"),

        email: yup
            .string().email('The email is invalid').required('This field is compulsory'),

        password: yup
            .string()
            .required("Password is required")
            .min(6, "Password must be at least 6 characters")
            .max(30, "Password must not exceed 30 characters")
            .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
            .matches(/[a-z]/, "Password must contain at least one lowercase letter")
            .matches(/[0-9]/, "Password must contain at least one number")
            .matches(/[@$!%*?&#]/, "Password must contain at least one special character"),

        confirmPassword: yup
            .string().oneOf([yup.ref("password"), null], "Passwords muct match")
            .required("Confirm password is required!"),

        role: yup.string().required("One of the role musst selected")


    }).required();