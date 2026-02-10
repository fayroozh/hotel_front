import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import HotelCard from "@/components/hotels/HotelCard";
import Link from "next/link";
import Button from "@mui/material/Button";


const hotels = [
  { title: "فندق شيراتون حلب", image: "/sh.jpeg" },
  { title: "فندق الشهباء – حلب", image: "/shh.jpeg" },
  { title: "فندق فور سيزون – دمشق", image: "/ss.jpeg" },
  { title: "فندق داما روز – دمشق", image: "/dd.jpeg" },
  { title: "فندق السفير – حمص", image: "/sf.jpeg" },
  { title: "فندق غولدن بيش – اللاذقية", image: "/gg.jpeg" },
];

export default function HotelsPage() {
  return (
    <Box
      sx={{
        py: 10,
        backgroundImage: "url('/Rectangle 22.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="lg">
        {/* العنوان */}
        <Typography
          align="center"
          sx={{
            color: "#fff",
            fontSize: "32px",
            fontWeight: 700,
            mb: 8,
          }}
        >
          الفنادق المتوفرة
        </Typography>

        {/* البطاقات */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: "32px",
            justifyItems: "center",
          }}
        >
          {hotels.map((hotel, index) => (
            <HotelCard
              key={index}
              title={hotel.title}
              image={hotel.image}
            />
          ))}
        </Box>

      </Container>
      <Box
  sx={{
    mt: 8,
    ml:16,
    display: "flex",
    justifyContent: "flex-end", // الزر على اليسار
  }}
>
  <Link href="/">
    <Button
      sx={{
        backgroundColor: "#fff",
        color: "#045746",
        borderRadius: "999px",
        px: 5,
        py: 1.2,
        fontSize:"20px",
        fontWeight:500,
        boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
        "&:hover": {
          backgroundColor: "#f5f5f5",
        },
      }}
    >
      العودة
    </Button>
  </Link>
</Box>

    </Box>
  );
}
