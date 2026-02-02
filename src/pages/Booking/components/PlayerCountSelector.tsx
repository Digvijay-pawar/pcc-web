import { Box, Typography, Stack, Button, LinearProgress } from '@mui/material';
import { People, Add, Remove } from '@mui/icons-material';

interface PlayerCountSelectorProps {
  count: number;
  maxAvailable: number;
  onChange: (count: number) => void;
}

const PlayerCountSelector = ({ count, maxAvailable, onChange }: PlayerCountSelectorProps) => {
  const maxSlots = Math.min(maxAvailable, 8);
  const progress = (count / maxSlots) * 100;

  const handleIncrement = () => {
    if (count < maxSlots) {
      onChange(count + 1);
    }
  };

  const handleDecrement = () => {
    if (count > 1) {
      onChange(count - 1);
    }
  };

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
        <People sx={{ fontSize: 24, color: 'secondary.main'  }} />
        <Typography variant="h6" fontWeight="600" color="text.primary">
          Number of Players
        </Typography>
      </Stack>

      <Typography variant="body2" color="text.secondary" mb={2}>
        How many players are you booking for? (Max 8 slots per booking)
      </Typography>

      <Stack direction="row" alignItems="center" spacing={2} mb={2}>
        <Button
          onClick={handleDecrement}
          disabled={count <= 1}
          variant="outlined"
          size="small"
          sx={{
            minWidth: 32,
            width: 32,
            height: 32,
            borderRadius: '50%',
            p: 0,
            '@media (max-width: 600px)': {
              minWidth: 28,
              width: 28,
              height: 28,
            },
          }}
        >
          <Remove sx={{ fontSize: { xs: 16, sm: 20 } }} />
        </Button>

        <Box sx={{ flex: 1 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="body2" color="text.secondary">
              {count} {count === 1 ? 'player' : 'players'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {count}/{maxSlots}
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: 'grey.200',
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
              },
            }}
          />
        </Box>

        <Button
          onClick={handleIncrement}
          disabled={count >= maxSlots}
          variant="outlined"
          size="small"
          sx={{
            minWidth: 32,
            width: 32,
            height: 32,
            borderRadius: '50%',
            p: 0,
            '@media (max-width: 600px)': {
              minWidth: 28,
              width: 28,
              height: 28,
            },
          }}
        >
          <Add />
        </Button>
      </Stack>

      {maxAvailable < 8 && (
        <Typography variant="caption" color="warning.main" sx={{ mt: 1.5, display: 'block' }}>
          Only {maxAvailable} {maxAvailable === 1 ? 'spot' : 'spots'} available
        </Typography>
      )}
    </Box>
  );
};

export default PlayerCountSelector;
