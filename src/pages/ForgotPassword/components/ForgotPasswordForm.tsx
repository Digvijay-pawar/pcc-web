import { Box, Stack } from "@mui/material";
import type { FormikProps } from "formik";
import MobileNumberField from "./MobileNumberField";
import SendOtpButton from "./SendOtpButton";
import BackToLoginButton from "./BackToLoginButton";

interface ForgotPasswordFormValues {
  mobileNumber: string;
}

interface ForgotPasswordFormProps {
  formik: FormikProps<ForgotPasswordFormValues>;
  isPending: boolean;
}

const ForgotPasswordForm = ({ formik, isPending }: ForgotPasswordFormProps) => {
  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: "100%" }}>
      <Stack spacing={3}>
        <MobileNumberField formik={formik} />
        <SendOtpButton
          formik={formik}
          isSubmitting={formik.isSubmitting || isPending}
        />
        <BackToLoginButton />
      </Stack>
    </Box>
  );
};

export default ForgotPasswordForm;
