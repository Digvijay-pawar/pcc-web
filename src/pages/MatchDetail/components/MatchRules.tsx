import { Box, Typography, Stack, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { CheckCircle, Gavel } from '@mui/icons-material';

interface MatchRulesProps {
  rules: string[];
}

const MatchRules = ({ rules }: MatchRulesProps) => {
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        borderRadius: 2,
        p: 3,
        border: '1px solid #e5e7eb',
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
        <Gavel sx={{ fontSize: 24, color: 'secondary.main' }} />
        <Typography variant="h6" fontWeight="600" color="text.primary">
          Match Rules
        </Typography>
      </Stack>

      <List sx={{ p: 0 }}>
        {rules.map((rule, index) => (
          <ListItem key={index} sx={{ px: 0, py: 1 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <CheckCircle sx={{ fontSize: 20, color: 'success.main' }} />
            </ListItemIcon>
            <ListItemText
              primary={rule}
              primaryTypographyProps={{
                variant: 'body2',
                color: 'text.primary',
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default MatchRules;
