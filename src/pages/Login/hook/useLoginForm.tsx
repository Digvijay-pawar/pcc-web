import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../../services/auth/auth.queries";

const useLoginForm = () => {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useLogin();

  const formik = useFormik({
    initialValues: {
      mobileNumber: "",
      password: "",
    },
    validationSchema: yup.object({
      mobileNumber: yup
        .string()
        .required("Mobile number is required")
        .trim()
        .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),

      password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(30, "Password is too long"),
    }),
    onSubmit: async (values) => {
      await login(values, {
        onSuccess: () => navigate("/"),
      });
    },
  });

  return { formik, isPending };
};

export default useLoginForm;
