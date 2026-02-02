import {
  Box,
  Container,
  Grid,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import useHomeData from "./hook/useHomeData";
import {
  FilterBar,
  MatchCard,
  TournamentCard,
  SectionHeader,
  EmptyState,
} from "./components";

const Home = () => {
  const {
    matches,
    tournaments,
    cities,
    areas,
    filters,
    updateFilter,
    loading,
  } = useHomeData();

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
            Loading...
          </Typography>
        </Stack>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)",
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
            Cricket Matches
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Find and join cricket matches in your area
          </Typography>
        </Box>

        <FilterBar
          cities={cities}
          areas={areas}
          filters={filters}
          onFilterChange={updateFilter}
        />

        <Box mb={4}>
          <SectionHeader title="Matches" count={matches.length} />

          {matches.length > 0 ? (
            <Grid container spacing={2}>
              {matches.map((match) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={match.id}>
                  <MatchCard match={match} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <EmptyState message="No matches found" />
          )}
        </Box>

        <Box>
          <SectionHeader title="Tournaments" count={tournaments.length} />

          {tournaments.length > 0 ? (
            <Grid container spacing={2}>
              {tournaments.map((tournament) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={tournament.id}>
                  <TournamentCard tournament={tournament} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <EmptyState message="No tournaments found" />
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
