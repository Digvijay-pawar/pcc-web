import { Box, Typography, Stack, TextField } from '@mui/material';
import { Person } from '@mui/icons-material';
import type { BookingPlayer } from '../../../types/matchDetail.types';

interface PlayerDetailsFormProps {
  players: BookingPlayer[];
  onChange: (index: number, value: string) => void;
}

const PlayerDetailsForm = ({ players, onChange }: PlayerDetailsFormProps) => {
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
        <Person sx={{ fontSize: 24, color: 'secondary.main' }} />
        <Typography variant="h6" fontWeight="600" color="text.primary">
          Player Details
        </Typography>
      </Stack>

      <Stack spacing={1}>
        {players.map((player, index) => (
          <Box
            key={index}
            sx={{
              p: 2.5,
              borderRadius: 2,
              backgroundColor: index === 0 ? '#f0fdf4' : '#f9fafb',
              border: index === 0 ? '1px solid #bbf7d0' : '1px solid #e5e7eb',
            }}
          >
            <Typography variant="subtitle2" fontWeight="600" color="text.primary" mb={2}>
              {index === 0 ? 'Player 1 (You)' : `Player ${index + 1}`}
            </Typography>
            <TextField
              fullWidth
              label="Full Name"
              placeholder="Enter player name"
              value={player.name}
              onChange={(e) => onChange(index, e.target.value)}
              size="small"
              disabled={index === 0}
            />
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default PlayerDetailsForm;
