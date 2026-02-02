import * as yup from "yup";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";

const useResetPasswordForm = () => {
  const { mobileNumber } = useParams<{ mobileNumber: string }>();

  const formik = useFormik({
    initialValues: {
      mobileNumber: mobileNumber || "",
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      mobileNumber: yup
        .string()
        .required("Mobile number is required")
        .trim()
        .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),

      otp: yup
        .string()
        .required("OTP is required")
        .trim()
        .matches(/^[0-9]{6}$/, "OTP must be exactly 6 digits"),

      newPassword: yup
        .string()
        .required("New password is required")
        .min(6, "Password must be at least 6 characters")
        .max(30, "Password is too long"),
    }),
    onSubmit: (values) => {
      console.log("Reset password form submitted", values);
    },
  });

  return { formik };
};

export default useResetPasswordForm;
