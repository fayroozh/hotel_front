
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import HotelCard from "../hotels/HotelCard";
import Link from "next/link";

export default function HotelSection() {
  return (
    <Box
      sx={{
        py: 10,
        backgroundImage: "url('/Rectangle 22.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container maxWidth="lg">
        {/* العنوان */}
        <Typography
          align="center"
          sx={{
            color: "#fff",
            fontSize: "36px",
            fontWeight: 700,
            mb: 10,
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
            gap: "24px",
            justifyItems: "center",
          }}
        >
          <HotelCard
            title="فندق شيراتون حلب"
            image="/sh.jpeg"
            href="/Infor-hotel"
          />

          <HotelCard
            title="فندق الشهباء – حلب"
            image="/shh.jpeg"
            href="/Infor-shahba"
          />

          <HotelCard
            title="فندق فور سيزون – دمشق"
            image="/ss.jpeg"
            href="/Infor-forsezon"
          />
        </Box>

        {/* الجزء السفلي */}
        <Box
          sx={{
            mt: 15,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              color: "#fff",
              fontSize: "36px",
              fontWeight: 600,
            }}
          >
            عرض المزيد من الفنادق
          </Typography>

          <Link href="/hotels">
            <Button
              sx={{
                backgroundColor: "#fff",
                color: "#605E5E",
                borderRadius: "999px",
                px: 4,
                py: 1.2,
                fontSize: "14px",
                boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              عرض المزيد … »
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
