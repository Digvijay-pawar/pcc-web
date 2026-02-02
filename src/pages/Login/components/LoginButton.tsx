import { Button } from '@mui/material';
import { gradients, shadows } from '../../../theme/theme';

interface LoginButtonProps {
  isSubmitting?: boolean;
}

const LoginButton = ({ isSubmitting = false }: LoginButtonProps) => {
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
      {isSubmitting ? 'Signing In...' : 'Sign In'}
    </Button>
  );
};

export default LoginButton;
