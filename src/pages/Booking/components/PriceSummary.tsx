import { Box, Typography, Stack, Divider } from '@mui/material';
import { Receipt } from '@mui/icons-material';

interface PriceSummaryProps {
  pricePerPlayer: number;
  numberOfPlayers: number;
  totalAmount: number;
}

const PriceSummary = ({ pricePerPlayer, numberOfPlayers, totalAmount }: PriceSummaryProps) => {
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
        <Receipt sx={{ fontSize: 24, color: 'secondary.main'  }} />
        <Typography variant="h6" fontWeight="600" color="text.primary">
          Price Summary
        </Typography>
      </Stack>

      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="text.secondary">
            Price per player
          </Typography>
          <Typography variant="body1" fontWeight="600" color="text.primary">
            ₹{pricePerPlayer}
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="text.secondary">
            Number of players
          </Typography>
          <Typography variant="body1" fontWeight="600" color="text.primary">
            {numberOfPlayers}
          </Typography>
        </Stack>

        <Divider />

        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="body1" fontWeight="600" color="text.primary">
            Total Amount
          </Typography>
          <Typography variant="h5" fontWeight="700" color="primary.main">
            ₹{totalAmount}
          </Typography>
        </Stack>

        <Box
          sx={{
            p: 1,
            px: 2,
            borderRadius: 2,
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
          }}
        >
          <Typography variant="caption" color="success.dark" fontWeight="500">
            💡 You're saving ₹{(pricePerPlayer * 0.1 * numberOfPlayers).toFixed(0)} with group booking!
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default PriceSummary;
