"use client";

import { Box, Typography, Container } from "@mui/material";
import GovernorateCard from "../governorates/GovernorateCard";

const governorates = [
  { title: "محافظة حلب", image: "/halab.png" },
  { title: "محافظة دمشق", image: "/Damascus.png" },
  { title: "محافظة حمص", image: "/homs.png" },
  { title: "محافظة اللاذقية", image: "/lad.png" },
];

export default function GovernoratesSection() {
  return (
    <Box sx={{ py: 8 }}>
      {/* ===== العنوان + الوصف ===== */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          sx={{
            fontSize: "36px",
            fontWeight: 700,
            color: "#045746",
            mb: 1,
          }}
        >
          المحافظات المتوفرة في موقعنا
        </Typography>

        <Typography sx={{ fontSize: "20px", color: "#000000" ,mb:"80px"}}>
          نقدم لكم أجمل وأحدث الفنادق المتوفرة في المحافظات السورية
        </Typography>
      </Box>

      {/* ===== البطاقات ===== */}
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: "24px",
            justifyContent: "center",   // 👈 مهم
            mb:"100px",
          }}
        >

          {governorates.map((item) => (
            <GovernorateCard
              key={item.title}
              title={item.title}
              image={item.image}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
