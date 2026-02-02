import { TextField, InputAdornment } from '@mui/material';
import { Pin } from '@mui/icons-material';
import type { FormikProps } from 'formik';

interface ResetPasswordFormValues {
  mobileNumber: string;
  otp: string;
  newPassword: string;
}

interface OTPFieldProps {
  formik: FormikProps<ResetPasswordFormValues>;
}

const OTPField = ({ formik }: OTPFieldProps) => {
  return (
    <TextField
      fullWidth
      id="otp"
      name="otp"
      label="OTP"
      placeholder="Enter 6-digit OTP"
      value={formik.values.otp}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched.otp && Boolean(formik.errors.otp)}
      helperText={formik.touched.otp && formik.errors.otp}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Pin color="primary" />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default OTPField;
