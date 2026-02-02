import {
  Box,
  Container,
  CircularProgress,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import { ArrowBack, EventAvailable } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useMatchDetail from "./hook/useMatchDetail";
import { MatchInfo, MatchRules, PlayersJoined } from "./components";

const MatchDetail = () => {
  const { match, loading } = useMatchDetail();
  const navigate = useNavigate();

  const handleBookSlot = () => {
    if (match) {
      navigate(`/booking/${match.id}`);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f9fafb",
        }}
      >
        <Stack spacing={2} alignItems="center">
          <CircularProgress size={50} />
          <Typography variant="body1" color="text.secondary">
            Loading match details...
          </Typography>
        </Stack>
      </Box>
    );
  }

  if (!match) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f9fafb",
        }}
      >
        <Typography variant="body1" color="text.secondary">
          Match not found
        </Typography>
      </Box>
    );
  }

  const isFull = match.joinedPlayers >= match.maxPlayers;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        py: 1,
        pb: 12,
      }}
    >
      <Container maxWidth="md">
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBack}
          sx={{ mb: 1, textTransform: "none" }}
        >
          Back to Matches
        </Button>

        <Stack spacing={3}>
          <MatchInfo match={match} />

          <MatchRules rules={match.rules} />

          <PlayersJoined
            players={match.players}
            totalPlayers={match.maxPlayers}
          />
          <Box
            sx={{
              position: "fixed",
              textAlign: "center",
              bottom: 0,
              left: 0,
              right: 0,
              p: 2,
              backgroundColor: "white",
              borderTop: "1px solid #e0e0e0",
              zIndex: 1000,
            }}
          >
            <Container maxWidth="md">
              <Button
                variant="contained"
                size="large"
                startIcon={<EventAvailable />}
                onClick={handleBookSlot}
                disabled={isFull}
                fullWidth
                sx={{
                  px: 4,
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
              >
                {isFull ? "Slot Full" : "Confirm Your Slot"}
              </Button>
            </Container>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default MatchDetail;
