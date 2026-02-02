import {
  Box,
  Container,
  CircularProgress,
  Stack,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import { ArrowBack, Payments } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useBooking from "./hook/useBooking";
import {
  PlayerCountSelector,
  PlayerDetailsForm,
  PriceSummary,
} from "./components";

const Booking = () => {
  const {
    match,
    loading,
    numberOfPlayers,
    players,
    handleNumberOfPlayersChange,
    handlePlayerChange,
    getTotalAmount,
    isFormValid,
  } = useBooking();
  const navigate = useNavigate();

  const handleBack = () => {
    if (match) {
      navigate(`/match/${match.id}`);
    }
  };

  const handleCompletePayment = () => {
    console.log("Payment initiated", {
      matchId: match?.id,
      numberOfPlayers,
      players,
      totalAmount: getTotalAmount(),
    });
    alert("Payment feature will be integrated soon!");
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
            Loading booking details...
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

  const maxAvailable = match.maxPlayers - match.joinedPlayers;

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
          Back to Match Details
        </Button>

        <Paper
          sx={{
            p: 3,
            mb: 2,
            borderRadius: 2,
            border: "1px solid #e5e7eb",
          }}
        >
          <Typography variant="h5" fontWeight="600" color="text.primary" mb={1}>
            Book Your Slot
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {match.title} -{" "}
            {new Date(match.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </Typography>
        </Paper>

        <Stack spacing={2}>
          <PlayerCountSelector
            count={numberOfPlayers}
            maxAvailable={maxAvailable}
            onChange={handleNumberOfPlayersChange}
          />

          <PlayerDetailsForm players={players} onChange={handlePlayerChange} />

          <PriceSummary
            pricePerPlayer={match.pricePerPlayer}
            numberOfPlayers={numberOfPlayers}
            totalAmount={getTotalAmount()}
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
                startIcon={<Payments />}
                onClick={handleCompletePayment}
                disabled={!isFormValid()}
                fullWidth
                sx={{
                  px: 4,
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
              >
                Complete Your Payment
              </Button>
            </Container>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Booking;
