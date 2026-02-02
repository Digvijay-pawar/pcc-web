import { Box, Typography, Stack } from '@mui/material';
import { SportsBaseball } from '@mui/icons-material';
import { gradients, shadows } from '../../../theme/theme';

const LoginHeader = () => {
  return (
    <Stack spacing={3} alignItems="center">
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: gradients.primary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: shadows.card,
        }}
      >
        <SportsBaseball sx={{ fontSize: 40, color: 'white' }} />
      </Box>

      <Box textAlign="center">
        <Typography 
          variant="h5" 
          fontWeight="bold" 
          sx={{ 
            background: gradients.primary,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1
          }}
        >
          Pune City Cricket (PCC)
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Sign in to manage your cricket tournaments
        </Typography>
      </Box>
    </Stack>
  );
};

export default LoginHeader;
