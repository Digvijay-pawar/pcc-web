import { Box, Stack, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import type { FormikProps } from 'formik';
import { gradients, shadows } from '../../../theme/theme';
import OTPField from './OTPField';
import NewPasswordField from './NewPasswordField';
import MobileNumberField from './MobileNumberField';

interface ResetPasswordFormValues {
  mobileNumber: string;
  otp: string;
  newPassword: string;
}

interface ResetPasswordFormProps {
  formik: FormikProps<ResetPasswordFormValues>;
  onBackToLogin?: () => void;
}

const ResetPasswordForm = ({ formik, onBackToLogin }: ResetPasswordFormProps) => {
  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: '100%' }}>
      <Stack spacing={3}>
        <MobileNumberField formik={formik} />
        <OTPField formik={formik} />
        <NewPasswordField formik={formik} />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={formik.isSubmitting}
          sx={{
            py: 1.5,
            background: gradients.primary,
            fontWeight: 'bold',
            fontSize: '1rem',
            borderRadius: 2,
            boxShadow: shadows.button,
            '&:hover': {
              background: gradients.primaryDark,
              boxShadow: shadows.buttonHover,
            },
            '&:disabled': {
              background: 'rgba(0, 0, 0, 0.12)',
            },
          }}
        >
          {formik.isSubmitting ? 'Resetting Password...' : 'Reset Password'}
        </Button>

        <Button
          fullWidth
          variant="text"
          startIcon={<ArrowBack />}
          onClick={onBackToLogin}
          sx={{
            color: 'text.secondary',
            '&:hover': {
              color: 'primary.main',
              backgroundColor: 'rgba(22, 163, 74, 0.08)',
            },
          }}
        >
          Back to Login
        </Button>
      </Stack>
    </Box>
  );
};

export default ResetPasswordForm;
