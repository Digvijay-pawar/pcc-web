import { Box, Typography, Stack, Avatar, Chip } from '@mui/material';
import { People } from '@mui/icons-material';
import type { PlayerInMatch } from '../../../types/matchDetail.types';

interface PlayersJoinedProps {
  players: PlayerInMatch[];
  totalPlayers: number;
}

const PlayersJoined = ({ players, totalPlayers }: PlayersJoinedProps) => {
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
        <People sx={{ fontSize: 24, color: 'primary.main' }} />
        <Typography variant="h6" fontWeight="600" color="text.primary">
          Players Joined
        </Typography>
        <Chip
          label={players.length}
          size="small"
          sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            fontWeight: 600,
            height: 24,
          }}
        />
      </Stack>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' },
          gap: 2,
        }}
      >
        {players.map((player) => (
          <Box
            key={player.id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 1.5,
              borderRadius: 2,
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <Avatar
              src={player.profileImage}
              alt={player.name}
              sx={{
                width: 50,
                height: 50,
                mb: 1,
                border: '2px solid #16a34a',
              }}
            />
            <Typography
              variant="body2"
              fontWeight="600"
              color="text.primary"
              textAlign="center"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                width: '100%',
              }}
            >
              {player.name}
            </Typography>
          </Box>
        ))}
      </Box>

      {players.length < totalPlayers && (
        <Box
          sx={{
            mt: 2,
            p: 2,
            borderRadius: 2,
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" color="success.dark" fontWeight="500">
            {totalPlayers - players.length} more {totalPlayers - players.length === 1 ? 'spot' : 'spots'} available
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default PlayersJoined;
