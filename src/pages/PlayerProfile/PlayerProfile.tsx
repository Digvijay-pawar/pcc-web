import {
  Box,
  Container,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import usePlayerProfile from "./hook/usePlayerProfile";
import {
  ProfileHeader,
  AvailabilitySection,
  MatchHistorySection,
  GallerySection,
  StatisticsSection,
} from "./components";

const PlayerProfile = () => {
  const { player, matchHistory, gallery, loading } = usePlayerProfile();

  const handleEditProfile = () => {
    console.log("Edit profile clicked");
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
            Loading profile...
          </Typography>
        </Stack>
      </Box>
    );
  }

  if (!player) {
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
          Player not found
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
        py: 3,
      }}
    >
      <Container maxWidth="lg">
        <Box mb={3}>
          <Typography
            variant="h4"
            fontWeight="600"
            color="text.primary"
            mb={0.5}
          >
            Player Profile
          </Typography>
          <Typography variant="body1" color="text.secondary">
            View and manage your cricket profile
          </Typography>
        </Box>

        <Stack spacing={3}>
          <ProfileHeader player={player} onEditProfile={handleEditProfile} />

          <AvailabilitySection availability={player.availability} />
          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            <Box sx={{ flex: 1 }}>
              <StatisticsSection statistics={player.statistics} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <MatchHistorySection matches={matchHistory} />
            </Box>
          </Stack>

          <GallerySection photos={gallery} />
        </Stack>
      </Container>
    </Box>
  );
};

export default PlayerProfile;
