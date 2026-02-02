import { Box, Container } from '@mui/material';
import type { ReactNode } from 'react';
import { gradients } from '../../../theme/theme';

interface AuthBackgroundProps {
  children: ReactNode;
}

const AuthBackground = ({ children }: AuthBackgroundProps) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: gradients.primary,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
        }
      }}
    >
      <Container maxWidth="sm">
        {children}
      </Container>
    </Box>
  );
};

export default AuthBackground;
