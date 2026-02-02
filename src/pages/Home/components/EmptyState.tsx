import { Box, Typography, Stack } from '@mui/material';
import { SearchOff } from '@mui/icons-material';

interface EmptyStateProps {
  message: string;
}

const EmptyState = ({ message }: EmptyStateProps) => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 6,
        px: 3,
        backgroundColor: '#f9fafb',
        borderRadius: 2,
        border: '1px dashed #d1d5db',
      }}
    >
      <Stack spacing={1.5} alignItems="center">
        <SearchOff sx={{ fontSize: 48, color: 'text.secondary', opacity: 0.5 }} />
        <Typography variant="body1" color="text.secondary" fontWeight="500">
          {message}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Try adjusting your filters
        </Typography>
      </Stack>
    </Box>
  );
};

export default EmptyState;
