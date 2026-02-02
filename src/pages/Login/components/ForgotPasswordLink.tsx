import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ForgotPasswordLinkProps {
  onClick?: () => void;
}

const ForgotPasswordLink = ({ onClick }: ForgotPasswordLinkProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate('/forgot-password');
    }
  };

  return (
    <Typography 
      variant="body2" 
      textAlign="center" 
      onClick={handleClick}
      sx={{ 
        color: 'text.secondary',
        cursor: 'pointer',
        '&:hover': {
          color: 'secondary.main',
          textDecoration: 'underline'
        }
      }}
    >
      Forgot Password?
    </Typography>
  );
};

export default ForgotPasswordLink;
