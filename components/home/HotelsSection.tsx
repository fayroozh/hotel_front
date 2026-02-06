"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import HotelCard from "../hotels/HotelCard";
import Link from "next/link";
import api from "@/lib/api";
import { CircularProgress } from "@mui/material";

interface Hotel {
  id: number;
  name: string;
  location: string;
  stars: number;
}

export default function HotelSection() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await api.get('/hotels');
        if (Array.isArray(response.data)) {
           setHotels(response.data.slice(0, 3));
        }
      } catch (error) {
        console.error("Failed to fetch hotels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

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
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress sx={{ color: '#fff' }} />
          </Box>
        ) : (
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
            {hotels.length > 0 ? (
              hotels.map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  title={hotel.name}
                  image={"/H.png"} // Default image as backend doesn't provide one
                />
              ))
            ) : (
              <Typography sx={{ color: '#fff', textAlign: 'center', width: '100%' }}>
                لا توجد فنادق متاحة حالياً
              </Typography>
            )}
          </Box>
        )}

        {/* الجزء السفلي (النص + الزر) */}
        <Box
          sx={{
            mt: 15,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* النص (يمين) */}
          <Typography
            sx={{
              color: "#fff",
              fontSize: "36px",
              fontWeight: 600,
            }}
          >
            عرض المزيد من الفنادق
          </Typography>

          {/* الزر (يسار) */}
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
