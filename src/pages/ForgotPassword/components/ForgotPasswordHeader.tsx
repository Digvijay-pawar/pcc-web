import { Box, Typography, Stack } from '@mui/material';
import { LockReset } from '@mui/icons-material';
import { gradients, shadows } from '../../../theme/theme';

const ForgotPasswordHeader = () => {
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
        <LockReset sx={{ fontSize: 40, color: 'white' }} />
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
          Forgot Password?
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Enter your mobile number to receive an OTP
        </Typography>
      </Box>
    </Stack>
  );
};

export default ForgotPasswordHeader;
