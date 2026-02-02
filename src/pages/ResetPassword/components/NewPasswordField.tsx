import { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import type { FormikProps } from 'formik';

interface ResetPasswordFormValues {
  mobileNumber: string;
  otp: string;
  newPassword: string;
}

interface NewPasswordFieldProps {
  formik: FormikProps<ResetPasswordFormValues>;
}

const NewPasswordField = ({ formik }: NewPasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      fullWidth
      id="newPassword"
      name="newPassword"
      label="New Password"
      type={showPassword ? 'text' : 'password'}
      placeholder="Enter new password"
      value={formik.values.newPassword}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
      helperText={formik.touched.newPassword && formik.errors.newPassword}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Lock color="primary" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleTogglePassword}
                edge="end"
                aria-label="toggle password visibility"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default NewPasswordField;
