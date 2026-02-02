# Reset Password Page

Page for users to reset their password using OTP verification.

## Structure

```
ResetPassword/
├── ResetPassword.tsx               # Main page component
├── hook/
│   └── useResetPasswordForm.tsx   # Formik form hook with validation
├── components/
│   ├── ResetPasswordHeader.tsx    # Header with key icon
│   ├── ResetPasswordForm.tsx      # Complete form container
│   ├── OTPField.tsx               # OTP input field
│   ├── NewPasswordField.tsx       # New password input
│   ├── ConfirmPasswordField.tsx   # Confirm password input
│   └── index.ts                   # Component exports
└── README.md                      # This file
```

## Components

### ResetPasswordHeader
Header section with key icon and instructions.

**Props:** None

### ResetPasswordForm
Complete form with all input fields and submit button.

**Props:**
- `formik: FormikProps<ResetPasswordFormValues>` - Formik instance
- `onBackToLogin?: () => void` - Back to login handler

### OTPField
OTP input field with pin icon.

**Props:**
- `formik: FormikProps<ResetPasswordFormValues>` - Formik instance

### NewPasswordField
New password input with lock icon and show/hide toggle.

**Props:**
- `formik: FormikProps<ResetPasswordFormValues>` - Formik instance

### ConfirmPasswordField
Confirm password input with lock icon and show/hide toggle.

**Props:**
- `formik: FormikProps<ResetPasswordFormValues>` - Formik instance

## Form Validation

- **Mobile Number**: Required, exactly 10 digits
- **OTP**: Required, exactly 6 digits
- **New Password**: Required, 6-30 characters
- **Confirm Password**: Required, must match new password

## API Integration

**Endpoint:** `POST /auth/reset-password`

**Request Body:**
```json
{
  "mobileNumber": "1234567890",
  "otp": "123456",
  "newPassword": "newpassword123"
}
```

## Usage Example

```tsx
import ResetPassword from './pages/ResetPassword/ResetPassword';

function App() {
  return <ResetPassword />;
}
```

## Flow

1. User enters mobile number (from forgot password flow)
2. User enters OTP received via SMS
3. User creates new password
4. User confirms new password
5. Password is reset and user can login with new credentials
