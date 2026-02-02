import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useForgotPassword } from "../../../services/auth/auth.queries";

const useForgotPasswordForm = () => {
  const navigate = useNavigate();
  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const formik = useFormik({
    initialValues: {
      mobileNumber: "",
    },
    validationSchema: yup.object({
      mobileNumber: yup
        .string()
        .required("Mobile number is required")
        .trim()
        .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),
    }),
    onSubmit: async (values) => {
      await forgotPassword(values, {
        onSuccess: () => {
          navigate(`/reset-password/${values.mobileNumber}`);
          formik.resetForm();
        },
      });
    },
  });

  return { formik, isPending };
};

export default useForgotPasswordForm;
