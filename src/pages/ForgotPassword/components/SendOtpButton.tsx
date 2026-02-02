import { Button } from "@mui/material";
import type { FormikProps } from "formik";
import { gradients, shadows } from "../../../theme";

interface ForgotPasswordFormValues {
  mobileNumber: string;
}

interface SendOtpButtonProps {
  formik: FormikProps<ForgotPasswordFormValues>;
  isSubmitting?: boolean;
}

const SendOtpButton = ({ isSubmitting = false }: SendOtpButtonProps) => {
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      size="large"
      disabled={isSubmitting}
      sx={{
        py: 1.5,
        background: gradients.primary,
        fontWeight: "bold",
        fontSize: "1rem",
        borderRadius: 2,
        boxShadow: shadows.button,
        "&:hover": {
          background: gradients.primaryDark,
          boxShadow: shadows.buttonHover,
        },
        "&:disabled": {
          background: "rgba(0, 0, 0, 0.12)",
        },
      }}
    >
      {isSubmitting ? "Sending OTP..." : "Send OTP"}
    </Button>
  );
};

export default SendOtpButton;
