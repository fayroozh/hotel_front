
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import HotelCard from "@/components/hotels/HotelCard";
import Link from "next/link";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import api, { BACKEND_URL } from "@/lib/api";

interface Hotel {
  id: number;
  name: string;
  location: string;
  stars: number;
  description?: string;
  image?: string | null;
}

export default function HotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/hotels').then(res => {
      let hotelsArray: any[] = [];
      if (Array.isArray(res.data)) hotelsArray = res.data;
      else if (Array.isArray(res.data?.data)) hotelsArray = res.data.data;
      else if (Array.isArray(res.data?.hotels)) hotelsArray = res.data.hotels;
      else if (Array.isArray(res.data?.data?.hotels)) hotelsArray = res.data.data.hotels;
      setHotels(hotelsArray);
      setLoading(false);
    }).catch(err => {
      console.error('Failed to fetch hotels', err);
      setLoading(false);
    });
  }, []);

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
          {loading ? (
            <Typography sx={{ color: "#fff", textAlign: "center" }}>جاري التحميل...</Typography>
          ) : (
            hotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                title={hotel.name}
                image={
                  hotel.image
                    ? `${BACKEND_URL}/storage/${hotel.image}`
                    : "/default-hotel.jpg"
                }
                href={`/hotels/${hotel.id}`}
              />
            ))
          )}
        </Box>
      </Container>

      {/* زر العودة */}
      <Box
        sx={{
          mt: 8,
          ml: 16,
          display: "flex",
          justifyContent: "flex-end",
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
              fontSize: "20px",
              fontWeight: 500,
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
