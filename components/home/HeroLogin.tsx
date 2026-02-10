"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// import NavBar from "../layout/NavBar";
import NavBarLogin from "../layout/NavBarLogin"
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";


export default function HeroLogin() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/hotels?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: "url('/H.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ================= NavBar ================= */}
      <Box sx={{ position: "relative", zIndex: 3 }}>
        <NavBarLogin />
      </Box>

      {/* ================= Overlay ================= */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,55,44,0.6)",
          zIndex: 1,
        }}
      />

      {/* ================= Hero Content ================= */}
      <Container
        sx={{
          flex: 1,
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: "#fff",
        }}
      >
        {/* ================= Search ================= */}
        <Box
          sx={{
            mb: 6,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TextField
            placeholder="قم بالبحث عن الفنادق"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            sx={{
              width: "540px",
              height: "66px",
              backgroundColor: "#F7EFEF",
              borderRadius: "20px",
              mt: 15,
              boxShadow: "0 10px 35px rgba(0,0,0,0.15)",

              "& .MuiOutlinedInput-root": {
                height: "66px",
                borderRadius: "20px",
                paddingRight: 22,
                paddingLeft: 2,
                "& fieldset": {
                  border: "none",
                },
              },

              "& .MuiOutlinedInput-input": {
                textAlign: "right",
                fontSize: "18px",
                color: "#A39F9F",
                padding: 1,
                fontFamily: "'Cairo', sans-serif",
              },

              "& .MuiOutlinedInput-input::placeholder": {
                color: "#A39F9F",
                opacity: 1,
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearch} edge="end">
                    <SearchIcon sx={{ color: "#A39F9F", fontSize: 24 }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* ================= Text ================= */}
        <Typography variant="h3" sx={{ fontWeight: 300, mb: 2, mt: 5 }}>
          موقع <strong>Seramila</strong> يساعدك لتطلع
        </Typography>

        <Typography variant="h3" sx={{ fontWeight: 300 }}>
          على الفنادق المتواجدة في المحافظات السورية
        </Typography>

        <Typography variant="h3" sx={{ fontWeight: 300, mt: 2 }}>
          يلا نعمل جولة بالواقع نتعرف على الفنادق
        </Typography>

        {/* ================= Buttons ================= */}
        <Box
          sx={{
            mt: 10,
            mb: 20,
            display: "flex",
            gap: 3,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {/* زر تعرّف على المزيد */}
          <Button
            sx={{
              width: "247px",
              height: "65px",
              backgroundColor: "#D9D9D9",
              color: "#00372C",
              borderRadius: "999px",
              fontWeight: 600,
              fontSize: "16px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
            onClick={() => router.push("/about")}
          >
            تعرّف على المزيد... »
          </Button>

          {/* زر احجز الآن */}
          <Link href="/booking">
          <Button
            sx={{
              width: "247px",
              height: "65px",
              backgroundColor: "#D9D9D9",
              color: "#00372C",
              borderRadius: "999px",
              fontWeight: 600,
              fontSize: "16px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.18)",
              "&:hover": {
                backgroundColor: "#005b49",
              },
            }}
            onClick={() => router.push("/booking")}
          >
            احجز الآن
          </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
