import { Box, Stack } from "@mui/material";
import type { FormikProps } from "formik";
import MobileNumberField from "./MobileNumberField";
import PasswordField from "./PasswordField";
import LoginButton from "./LoginButton";
import ForgotPasswordLink from "./ForgotPasswordLink";

interface LoginFormValues {
  mobileNumber: string;
  password: string;
}

interface LoginFormProps {
  formik: FormikProps<LoginFormValues>;
  isPending: boolean;
  onForgotPassword?: () => void;
}

const LoginForm = ({ formik, isPending, onForgotPassword }: LoginFormProps) => {
  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: "100%" }}>
      <Stack spacing={3}>
        <MobileNumberField formik={formik} />
        <PasswordField formik={formik} />
        <LoginButton isSubmitting={formik.isSubmitting || isPending} />
        <ForgotPasswordLink onClick={onForgotPassword} />
      </Stack>
    </Box>
  );
};

export default LoginForm;
