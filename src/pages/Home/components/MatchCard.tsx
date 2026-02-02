import { Card, CardContent, Typography, Chip, Stack, Divider, Button } from '@mui/material';
import { 
  CalendarToday, 
  AccessTime, 
  LocationOn, 
  People
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import type { Match } from '../../../types/match.types';

interface MatchCardProps {
  match: Match;
}

const MatchCard = ({ match }: MatchCardProps) => {
  const navigate = useNavigate();

  const getStatusColor = () => {
    switch (match.status) {
      case 'live':
        return 'error';
      case 'upcoming':
        return 'info';
      case 'completed':
        return 'success';
      default:
        return 'default';
    }
  };

  const isFull = match.joinedPlayers >= match.maxPlayers;
  const spotsLeft = match.maxPlayers - match.joinedPlayers;

  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 2,
        border: '1px solid #e5e7eb',
        transition: 'box-shadow 0.2s',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
            <Typography variant="h6" fontWeight="600" color="text.primary" sx={{ flex: 1 }}>
              {match.title}
            </Typography>
            <Chip
              label={match.status.toUpperCase()}
              color={getStatusColor()}
              size="small"
              sx={{ fontWeight: 600, fontSize: '0.7rem' }}
            />
          </Stack>

          {match.description && (
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
              {match.description}
            </Typography>
          )}

          <Divider />

          <Stack spacing={1.5}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <CalendarToday sx={{ fontSize: 18, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.primary">
                {new Date(match.date).toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1.5} alignItems="center">
              <AccessTime sx={{ fontSize: 18, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.primary">
                {match.time}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1.5} alignItems="center">
              <LocationOn sx={{ fontSize: 18, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.primary">
                {match.venue}, {match.area}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1.5} alignItems="center">
              <People sx={{ fontSize: 18, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.primary">
                {match.joinedPlayers} / {match.maxPlayers} Players
              </Typography>
              {match.status === 'upcoming' && (
                <Chip
                  label={isFull ? 'Full' : `${spotsLeft} spots left`}
                  size="small"
                  color={isFull ? 'default' : 'success'}
                  sx={{ 
                    height: 20, 
                    fontSize: '0.7rem',
                    fontWeight: 600,
                  }}
                />
              )}
            </Stack>
          </Stack>

          <Button
            variant="outlined"
            size="small"
            fullWidth
            onClick={() => navigate(`/match/${match.id}`)}
            sx={{ mt: 2, textTransform: 'none', fontWeight: 600 }}
          >
            View Details
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default MatchCard;
