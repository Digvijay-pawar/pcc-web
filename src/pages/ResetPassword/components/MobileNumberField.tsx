import { TextField, InputAdornment } from '@mui/material';
import { Phone } from '@mui/icons-material';
import type { FormikProps } from 'formik';

interface IResetPasswordValues {
  mobileNumber: string;
  newPassword: string;
  otp: string;
}

interface MobileNumberFieldProps {
  formik: FormikProps<IResetPasswordValues>;
}

const MobileNumberField = ({ formik }: MobileNumberFieldProps) => {
  return (
    <TextField
      fullWidth
      disabled
      id="mobileNumber"
      name="mobileNumber"
      label="Mobile Number"
      placeholder="Enter 10-digit mobile number"
      value={formik.values.mobileNumber}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)}
      helperText={formik.touched.mobileNumber && formik.errors.mobileNumber}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Phone color="primary" />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default MobileNumberField;
