import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  Stack,
  LinearProgress,
} from "@mui/material";
import { CalendarToday, LocationOn, SportsScore } from "@mui/icons-material";
import type { Tournament } from "../../../types/match.types";

interface TournamentCardProps {
  tournament: Tournament;
}

const TournamentCard = ({ tournament }: TournamentCardProps) => {
  const getStatusColor = () => {
    switch (tournament.status) {
      case "ongoing":
        return "error";
      case "upcoming":
        return "warning";
      case "completed":
        return "success";
      default:
        return "default";
    }
  };

  const progress =
    (tournament.completedMatches / tournament.totalMatches) * 100;

  return (
    <Card
      sx={{
        height: "100%",
        width: 1,
        borderRadius: 2,
        border: "1px solid #e5e7eb",
        transition: "box-shadow 0.2s",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Stack spacing={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={1}
          >
            <Typography
              variant="h6"
              fontWeight="600"
              color="text.primary"
              sx={{ flex: 1 }}
            >
              {tournament.name}
            </Typography>
            <Chip
              label={tournament.status.toUpperCase()}
              color={getStatusColor()}
              size="small"
              sx={{ fontWeight: 600, fontSize: "0.7rem" }}
            />
          </Stack>

          {tournament.description && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: "0.875rem" }}
            >
              {tournament.description}
            </Typography>
          )}

          <Box>
            <Stack direction="row" justifyContent="space-between" mb={1}>
              <Typography
                variant="body2"
                color="text.secondary"
                fontSize="0.875rem"
              >
                Progress
              </Typography>
              <Typography
                variant="body2"
                fontWeight="600"
                color="secondary.main"
                fontSize="0.875rem"
              >
                {tournament.completedMatches} / {tournament.totalMatches}
              </Typography>
            </Stack>
            <LinearProgress
              color="secondary"
              variant="buffer"
              value={progress}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: "#e5e7eb",
              }}
            />
          </Box>

          <Stack spacing={1.5}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <CalendarToday sx={{ fontSize: 18, color: "text.secondary" }} />
              <Typography
                variant="body2"
                color="text.primary"
                fontSize="0.875rem"
              >
                {new Date(tournament.startDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}{" "}
                -{" "}
                {new Date(tournament.endDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1.5} alignItems="center">
              <LocationOn sx={{ fontSize: 18, color: "text.secondary" }} />
              <Typography
                variant="body2"
                color="text.primary"
                fontSize="0.875rem"
              >
                {tournament.area === "All"
                  ? tournament.city
                  : `${tournament.area}, ${tournament.city}`}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1.5} alignItems="center">
              <SportsScore sx={{ fontSize: 18, color: "text.secondary" }} />
              <Typography
                variant="body2"
                color="text.primary"
                fontSize="0.875rem"
              >
                {tournament.totalMatches} Matches
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TournamentCard;
