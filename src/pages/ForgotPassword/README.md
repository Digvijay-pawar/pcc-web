# Forgot Password Page

Page for users to request an OTP to reset their password.

## Structure

```
ForgotPassword/
├── ForgotPassword.tsx              # Main page component
├── hook/
│   └── useForgotPasswordForm.tsx  # Formik form hook with validation
├── components/
│   ├── ForgotPasswordHeader.tsx   # Header with lock reset icon
│   ├── ForgotPasswordForm.tsx     # Form with mobile number input
│   └── index.ts                   # Component exports
└── README.md                      # This file
```

## Components

### ForgotPasswordHeader
Header section with lock reset icon and instructions.

**Props:** None

### ForgotPasswordForm
Form with mobile number input and submit button.

**Props:**
- `formik: FormikProps<ForgotPasswordFormValues>` - Formik instance
- `onBackToLogin?: () => void` - Back to login handler

## Form Validation

- **Mobile Number**: Required, exactly 10 digits

## API Integration

**Endpoint:** `POST /auth/forgot-password`

**Request Body:**
```json
{
  "mobileNumber": "1234567890"
}
```

## Usage Example

```tsx
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';

function App() {
  return <ForgotPassword />;
}
```

## Flow

1. User enters mobile number
2. System sends OTP to the mobile number
3. User is redirected to Reset Password page
