import { Box, Typography, Stack } from '@mui/material';
import { 
  EmojiEvents, 
  SportsBaseball, 
  SportsCricket,
  TrendingUp,
  Stars,
  PanTool
} from '@mui/icons-material';
import type { Player } from '../../../types/player.types';

interface StatisticsSectionProps {
  statistics: Player['statistics'];
}

const StatisticsSection = ({ statistics }: StatisticsSectionProps) => {
  const stats = [
    {
      label: 'Matches',
      value: statistics.totalMatches,
      icon: <SportsBaseball sx={{ fontSize: 28 }} />,
      color: '#16a34a',
      bgColor: 'rgba(22, 163, 74, 0.1)',
    },
    {
      label: 'Total Runs',
      value: statistics.totalRuns,
      icon: <SportsCricket sx={{ fontSize: 28 }} />,
      color: '#0284c7',
      bgColor: 'rgba(2, 132, 199, 0.1)',
    },
    {
      label: 'Wickets',
      value: statistics.totalWickets,
      icon: <EmojiEvents sx={{ fontSize: 28 }} />,
      color: '#f59e0b',
      bgColor: 'rgba(245, 158, 11, 0.1)',
    },
    {
      label: 'Highest Score',
      value: statistics.highestScore,
      icon: <TrendingUp sx={{ fontSize: 28 }} />,
      color: '#8b5cf6',
      bgColor: 'rgba(139, 92, 246, 0.1)',
    },
    {
      label: 'Best Bowling',
      value: statistics.bestBowling,
      icon: <Stars sx={{ fontSize: 28 }} />,
      color: '#ec4899',
      bgColor: 'rgba(236, 72, 153, 0.1)',
    },
    {
      label: 'Catches',
      value: statistics.catches,
      icon: <PanTool sx={{ fontSize: 28 }} />,
      color: '#14b8a6',
      bgColor: 'rgba(20, 184, 166, 0.1)',
    },
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
      <Typography variant="h6" fontWeight="600" color="text.primary" mb={2.5}>
        Cricket Statistics
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 2,
        }}
      >
        {stats.map((stat, index) => (
          <Box key={index}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: stat.bgColor,
                border: `1px solid ${stat.color}20`,
                textAlign: 'center',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  color: stat.color,
                  mb: 1.5,
                  boxShadow: `0 2px 8px ${stat.color}30`,
                }}
              >
                {stat.icon}
              </Box>
              <Typography
                variant="h4"
                fontWeight="700"
                color={stat.color}
                mb={0.5}
                sx={{ lineHeight: 1 }}
              >
                {stat.value}
              </Typography>
              <Typography variant="caption" color="text.secondary" fontWeight="500">
                {stat.label}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          mt: 3,
          p: 2,
          borderRadius: 2,
          backgroundColor: '#f9fafb',
          border: '1px solid #e5e7eb',
        }}
      >
        <Stack direction="row" spacing={2} justifyContent="space-around" flexWrap="wrap">
          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary" mb={0.5}>
              Batting Avg
            </Typography>
            <Typography variant="h6" fontWeight="600" color="primary.main">
              {statistics.totalMatches > 0 
                ? (statistics.totalRuns / statistics.totalMatches).toFixed(1)
                : '0.0'}
            </Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary" mb={0.5}>
              Strike Rate
            </Typography>
            <Typography variant="h6" fontWeight="600" color="secondary.main">
              {statistics.totalMatches > 0 
                ? ((statistics.totalRuns / (statistics.totalMatches * 20)) * 100).toFixed(1)
                : '0.0'}
            </Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary" mb={0.5}>
              Wickets/Match
            </Typography>
            <Typography variant="h6" fontWeight="600" color="warning.main">
              {statistics.totalMatches > 0 
                ? (statistics.totalWickets / statistics.totalMatches).toFixed(1)
                : '0.0'}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default StatisticsSection;
