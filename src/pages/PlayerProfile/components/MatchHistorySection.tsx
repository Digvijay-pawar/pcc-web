import { Box, Typography, Stack, Chip } from '@mui/material';
import { SportsBaseball, CalendarToday, LocationOn } from '@mui/icons-material';
import type { MatchHistory } from '../../../types/player.types';

interface MatchHistorySectionProps {
  matches: MatchHistory[];
}

const MatchHistorySection = ({ matches }: MatchHistorySectionProps) => {
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
        <SportsBaseball sx={{ fontSize: 24, color: 'primary.main' }} />
        <Typography variant="h6" fontWeight="600" color="text.primary">
          Match History
        </Typography>
        <Chip
          label={matches.length}
          size="small"
          sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            fontWeight: 600,
            height: 24,
          }}
        />
      </Stack>

      {matches.length > 0 ? (
        <Stack spacing={2}>
          {matches.map((match, index) => (
            <Box
              key={match.id}
              sx={{
                position: 'relative',
                pl: 3,
                pb: index < matches.length - 1 ? 2 : 0,
                borderLeft: index < matches.length - 1 ? '2px solid #e5e7eb' : 'none',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: -6,
                  top: 0,
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: 'primary.main',
                  border: '2px solid white',
                  boxShadow: '0 0 0 2px #16a34a',
                },
              }}
            >
              <Typography variant="body1" fontWeight="600" color="text.primary" mb={0.5}>
                {match.matchTitle}
              </Typography>
              <Stack spacing={0.5}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <CalendarToday sx={{ fontSize: 14, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary" fontSize="0.875rem">
                    {new Date(match.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <LocationOn sx={{ fontSize: 14, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary" fontSize="0.875rem">
                    {match.venue}, {match.area}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          ))}
        </Stack>
      ) : (
        <Box
          sx={{
            textAlign: 'center',
            py: 4,
            backgroundColor: '#f9fafb',
            borderRadius: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            No matches joined yet
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default MatchHistorySection;
