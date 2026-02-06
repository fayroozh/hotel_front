import { Box } from "@mui/material";
import SignupMuiCard from "@/components/auth/SignupMuiCard";

export default function SignupPage() {
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
        <SignupMuiCard />
      </Box>
    </Box>
  );
}
