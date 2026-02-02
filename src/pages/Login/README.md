# Login Page

Cricket-themed login page for the PCC (Pune City Cricket) application.

## Structure

```
Login/
├── Login.tsx                    # Main login page component
├── hook/
│   └── useLoginForm.tsx        # Formik form hook with validation
├── components/
│   ├── LoginBackground.tsx     # Full-screen gradient background
│   ├── LoginCard.tsx           # Glass-morphism card container
│   ├── LoginHeader.tsx         # Logo and title section
│   ├── LoginForm.tsx           # Form container with all fields
│   ├── MobileNumberField.tsx   # Mobile number input field
│   ├── PasswordField.tsx       # Password input with show/hide
│   ├── LoginButton.tsx         # Submit button
│   └── ForgotPasswordLink.tsx  # Forgot password link
└── README.md                   # This file
```

## Components

### LoginBackground
Full-screen gradient background with cricket theme colors and decorative elements.

**Props:** 
- `children: ReactNode` - Content to render inside

### LoginCard
Glass-morphism styled card with backdrop blur effect.

**Props:**
- `children: ReactNode` - Content to render inside

### LoginHeader
Cricket ball icon with app title and subtitle.

**Props:** None

### LoginForm
Complete form with all input fields and submit button.

**Props:**
- `formik: FormikProps<LoginFormValues>` - Formik instance
- `onForgotPassword?: () => void` - Forgot password handler

### MobileNumberField
Mobile number input field with phone icon and validation.

**Props:**
- `formik: FormikProps<LoginFormValues>` - Formik instance

### PasswordField
Password input field with lock icon and show/hide toggle.

**Props:**
- `formik: FormikProps<LoginFormValues>` - Formik instance

### LoginButton
Gradient submit button with loading state support.

**Props:**
- `isSubmitting?: boolean` - Loading state

### ForgotPasswordLink
Clickable forgot password link with hover effects.

**Props:**
- `onClick?: () => void` - Click handler

## Form Validation

The form uses Yup schema validation:

- **Mobile Number**: Required, exactly 10 digits
- **Password**: Required, 6-30 characters

## Usage Example

```tsx
import Login from './pages/Login/Login';

function App() {
  return <Login />;
}
```

## Customization

All components use the global theme from `src/theme/theme.ts`. To customize colors, gradients, or shadows, update the theme configuration.
