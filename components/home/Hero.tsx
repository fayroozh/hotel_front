  "use client";

  import { useState } from "react";
  import { useRouter } from "next/navigation";
  import Box from "@mui/material/Box";
  import Container from "@mui/material/Container";
  import Typography from "@mui/material/Typography";
  import Button from "@mui/material/Button";
  import NavBar from "../layout/NavBar";
  import TextField from "@mui/material/TextField";
  import InputAdornment from "@mui/material/InputAdornment";
  import SearchIcon from "@mui/icons-material/Search";
  import IconButton from "@mui/material/IconButton";

  export default function Hero() {
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();

    const handleSearch = () => {
      if (searchTerm.trim()) {
        router.push(`/hotels?search=${encodeURIComponent(searchTerm)}`);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
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
        {/* لازم يكون فوق الـ overlay */}
        <Box sx={{ position: "relative", zIndex: 3 }}>
          <NavBar />
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
          <Box sx={{  mb: 6, width: "100%", display: "flex",  justifyContent: "center" }}>
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
  mt:15,
  boxShadow: "0 10px 35px rgba(0,0,0,0.15)",

  "& .MuiOutlinedInput-root": {
    height: "66px",
    borderRadius: "20px",
    paddingRight: 20,
    paddingLeft: 20,

    "& fieldset": {
      border: "none",
    },
  },

  "& .MuiOutlinedInput-input": {
    textAlign: "right",
    fontSize: "18px",
    color: "#A39F9F",
    padding: 4,
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

          <Typography
            variant="h3"
            sx={{
              fontWeight: 300,
              mb: 2,
              mt:5,
            }}
          >
            موقع <strong>Seramila</strong> يساعدك لتطلع
          </Typography>

          <Typography
          variant="h3"
            sx={{
            
              fontWeight: 300,
              // fontSize: 18,
              // maxWidth: 600,
              // opacity: 0.95,
            }}
          >
            على الفنادق المتواجدة في المحافظات السورية
          </Typography>
          <Typography
          variant="h3"
            sx={{
            
              fontWeight: 300,
              mt:2,
              // fontSize: 18,
              // maxWidth: 600,
              // opacity: 0.95,
            }}
          >
            يلا نعمل جولة بالواقع نتعرف على الفنادق
          </Typography>

          <Button
    sx={{
      mt: 10,
      mb:20,
      width: "247px",          // عرض الزر
      height: "65px",          // ارتفاع الزر
      backgroundColor: "#D9D9D9",
      color: "#00372C",
      borderRadius: "999px",
      fontWeight: 600,
      fontSize: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 1.5,
      boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
      "&:hover": {
        backgroundColor: "#f5f5f5",
      },
    }}
  >
    {/* النص */}
    تعرّف على المزيد... »
  </Button>

        </Container>
      </Box>
    );
  }
