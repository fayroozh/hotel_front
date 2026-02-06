import { Box } from "@mui/material";
import LoginMuiCard from "@/components/auth/LoginMuiCard";

export default function LoginPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#F5F5F5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        py: 6,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 1100 }}>
        <LoginMuiCard />
      </Box>
    </Box>
  );
}
