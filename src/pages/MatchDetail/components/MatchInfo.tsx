import { Box, Typography, Stack, Chip } from '@mui/material';
import { 
  CalendarToday, 
  AccessTime, 
  LocationOn, 
  People,
  AttachMoney
} from '@mui/icons-material';
import type { MatchDetail } from '../../../types/matchDetail.types';

interface MatchInfoProps {
  match: MatchDetail;
}

const MatchInfo = ({ match }: MatchInfoProps) => {
  const spotsLeft = match.maxPlayers - match.joinedPlayers;
  const isFull = spotsLeft === 0;

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        borderRadius: 2,
        p: 3,
        border: '1px solid #e5e7eb',
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
        <Typography variant="h5" fontWeight="600" color="text.primary">
          {match.title}
        </Typography>
        <Chip
          label={match.status.toUpperCase()}
          color="primary"
          size="small"
          sx={{ fontWeight: 600 }}
        />
      </Stack>

      <Typography variant="body1" color="text.secondary" mb={3}>
        {match.description}
      </Typography>

      <Stack spacing={2}>
        <Stack direction="row" spacing={2} alignItems="center">
          <CalendarToday sx={{ fontSize: 20, color: 'primary.main' }} />
          <Box>
            <Typography variant="body2" color="text.secondary" fontSize="0.75rem">
              Date
            </Typography>
            <Typography variant="body1" fontWeight="600" color="text.primary">
              {new Date(match.date).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          <AccessTime sx={{ fontSize: 20, color: 'primary.main' }} />
          <Box>
            <Typography variant="body2" color="text.secondary" fontSize="0.75rem">
              Time
            </Typography>
            <Typography variant="body1" fontWeight="600" color="text.primary">
              {match.time}
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          <LocationOn sx={{ fontSize: 20, color: 'primary.main' }} />
          <Box>
            <Typography variant="body2" color="text.secondary" fontSize="0.75rem">
              Venue
            </Typography>
            <Typography variant="body1" fontWeight="600" color="text.primary">
              {match.venue}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {match.address}
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          <People sx={{ fontSize: 20, color: 'primary.main' }} />
          <Box>
            <Typography variant="body2" color="text.secondary" fontSize="0.75rem">
              Players
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body1" fontWeight="600" color="text.primary">
                {match.joinedPlayers} / {match.maxPlayers}
              </Typography>
              <Chip
                label={isFull ? 'Full' : `${spotsLeft} spots left`}
                size="small"
                color={isFull ? 'default' : 'success'}
                sx={{ height: 20, fontSize: '0.7rem', fontWeight: 600 }}
              />
            </Stack>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          <AttachMoney sx={{ fontSize: 20, color: 'primary.main' }} />
          <Box>
            <Typography variant="body2" color="text.secondary" fontSize="0.75rem">
              Price per Player
            </Typography>
            <Typography variant="h6" fontWeight="700" color="primary.main">
              ₹{match.pricePerPlayer}
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default MatchInfo;
