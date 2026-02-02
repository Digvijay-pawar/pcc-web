import { Box, Typography, Stack } from '@mui/material';
import { CalendarMonth } from '@mui/icons-material';
import type { Player } from '../../../types/player.types';

interface AvailabilitySectionProps {
  availability: Player['availability'];
}

const AvailabilitySection = ({ availability }: AvailabilitySectionProps) => {
  const days = [
    { key: 'monday', label: 'M', fullName: 'Monday' },
    { key: 'tuesday', label: 'T', fullName: 'Tuesday' },
    { key: 'wednesday', label: 'W', fullName: 'Wednesday' },
    { key: 'thursday', label: 'T', fullName: 'Thursday' },
    { key: 'friday', label: 'F', fullName: 'Friday' },
    { key: 'saturday', label: 'S', fullName: 'Saturday' },
    { key: 'sunday', label: 'S', fullName: 'Sunday' },
  ];

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        borderRadius: 2,
        p: 3,
        border: '1px solid #e5e7eb',
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="center" mb={2.5}>
        <CalendarMonth sx={{ fontSize: 24, color: 'secondary.main' }} />
        <Typography variant="h6" fontWeight="600" color="text.primary">
          Availability
        </Typography>
      </Stack>

      <Stack direction="row" spacing={1.5} justifyContent="space-between">
        {days.map((day) => {
          const isAvailable = availability[day.key as keyof typeof availability];
          return (
            <Box
              key={day.key}
              sx={{
                flex: 1,
                textAlign: 'center',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  aspectRatio: '1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 2,
                  backgroundColor: isAvailable ? 'secondary.main' : '#f3f4f6',
                  color: isAvailable ? 'white' : '#9ca3af',
                  fontWeight: 600,
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  cursor: isAvailable ? 'default' : 'not-allowed',
                  opacity: isAvailable ? 1 : 0.6,
                  border: isAvailable ? '2px solid #0284c7' : '1px solid #e5e7eb',
                }}
              >
                {day.label}
              </Box>
              <Typography
                variant="caption"
                color={isAvailable ? 'text.primary' : 'text.secondary'}
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  mt: 0.5,
                  fontSize: '0.75rem',
                }}
              >
                {day.fullName.slice(0, 3)}
              </Typography>
            </Box>
          );
        })}
      </Stack>

      <Box mt={2.5}>
        <Typography variant="body2" color="text.secondary">
          Available on:{' '}
          {days
            .filter((day) => availability[day.key as keyof typeof availability])
            .map((day) => day.fullName)
            .join(', ') || 'No days selected'}
        </Typography>
      </Box>
    </Box>
  );
};

export default AvailabilitySection;
