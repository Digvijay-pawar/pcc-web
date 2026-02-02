import { Paper, Stack } from '@mui/material';
import type { ReactNode } from 'react';

interface LoginCardProps {
  children: ReactNode;
}

const LoginCard = ({ children }: LoginCardProps) => {
  return (
    <Paper
      elevation={24}
      sx={{
        p: 4,
        borderRadius: 4,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        position: 'relative',
        zIndex: 1
      }}
    >
      <Stack spacing={3} alignItems="center">
        {children}
      </Stack>
    </Paper>
  );
};

export default LoginCard;
