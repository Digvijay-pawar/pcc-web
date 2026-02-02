import { Box, Typography, Stack, Avatar, Button } from "@mui/material";
import { Edit, Email, Phone, LocationOn } from "@mui/icons-material";
import type { Player } from "../../../types/player.types";

interface ProfileHeaderProps {
  player: Player;
  onEditProfile: () => void;
}

const ProfileHeader = ({ player, onEditProfile }: ProfileHeaderProps) => {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: 2,
        p: 3,
        border: "1px solid #e5e7eb",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={3}
        alignItems={{ xs: "center", sm: "flex-start" }}
      >
        <Avatar
          src={player.profileImage}
          alt={player.name}
          sx={{
            width: 100,
            height: 100,
            border: "3px solid #16a34a",
          }}
        />

        <Box flex={1}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "center", sm: "flex-start" }}
            mb={2}
            spacing={{ xs: 1, sm: 0 }}
          >
            <Button
              variant="outlined"
              startIcon={<Edit />}
              onClick={onEditProfile}
              size="small"
              sx={{
                textTransform: "none",
                order: { xs: 1, sm: 2 },
              }}
            >
              Edit Profile
            </Button>
            <Box sx={{ order: { xs: 2, sm: 1 } }}>
              <Typography
                variant="h5"
                fontWeight="600"
                color="text.primary"
                mb={0.5}
              >
                {player.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Member since{" "}
                {new Date(player.joinedDate).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </Typography>
            </Box>
          </Stack>

          <Stack spacing={1.5}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Email sx={{ fontSize: 18, color: "text.secondary" }} />
              <Typography variant="body2" color="text.primary">
                {player.email}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1.5} alignItems="center">
              <Phone sx={{ fontSize: 18, color: "text.secondary" }} />
              <Typography variant="body2" color="text.primary">
                {player.mobileNumber}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1.5} alignItems="center">
              <LocationOn sx={{ fontSize: 18, color: "text.secondary" }} />
              <Typography variant="body2" color="text.primary">
                {player.area}, {player.city}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default ProfileHeader;
