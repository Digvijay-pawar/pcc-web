import { ArrowBack } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BackToLoginButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      fullWidth
      variant="text"
      startIcon={<ArrowBack />}
      onClick={() => navigate("/login")}
      sx={{
        color: "text.secondary",
        "&:hover": {
          color: "primary.main",
          backgroundColor: "rgba(22, 163, 74, 0.08)",
        },
      }}
    >
      Back to Login
    </Button>
  );
};

export default BackToLoginButton;
