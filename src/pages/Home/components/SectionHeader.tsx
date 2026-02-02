import { Box, Typography, Stack } from '@mui/material';

interface SectionHeaderProps {
  title: string;
  count?: number;
}

const SectionHeader = ({ title, count }: SectionHeaderProps) => {
  return (
    <Box mb={2}>
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Typography variant="h5" fontWeight="600" color="text.primary">
          {title}
        </Typography>
        {count !== undefined && (
          <Box
            sx={{
              backgroundColor: title === 'Tournaments' ? 'secondary.main' : 'primary.main',
              color: 'white',
              borderRadius: 1.5,
              px: 1.5,
              py: 0.5,
              fontSize: '0.875rem',
              fontWeight: 600,
            }}
          >
            {count}
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default SectionHeader;
