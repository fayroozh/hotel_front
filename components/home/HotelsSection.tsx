"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import HotelCard from "../hotels/HotelCard";
import Link from "next/link";
import api, { BACKEND_URL } from "@/lib/api";
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

  const staticHotels: Hotel[] = [
    {
      id: 1,
      name: "فندق سيراميلا دمشق",
      location: "دمشق - ساحة الأمويين",
      stars: 5,
    },
    {
      id: 2,
      name: "فندق سيراميلا حلب",
      location: "حلب - العزيزية",
      stars: 4,
    },
    {
      id: 3,
      name: "فندق سيراميلا اللاذقية",
      location: "اللاذقية - الكورنيش البحري",
      stars: 4,
    },
  ];

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await api.get('/hotels');
        const root = response.data;
        const candidates = [
          root?.data,
          root?.data?.hotels,
          root?.hotels,
          root?.hotels?.data,
          root,
        ];
        let list: any = [];
        for (const c of candidates) {
          if (Array.isArray(c)) {
            list = c;
            break;
          }
        }
        setHotels(Array.isArray(list) ? list.slice(0, 3) : []);
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
                {hotels.length > 0
                  ? hotels.map((hotel) => (
                      <HotelCard
                        key={hotel.id}
                        title={hotel.name}
                        image={(hotel as any).image ? `${BACKEND_URL}/storage/${(hotel as any).image}` : "/H.png"}
                        href={`/hotels/${hotel.id}`}
                      />
                    ))
                  : staticHotels.map((hotel) => (
                      <HotelCard
                        key={hotel.id}
                        title={hotel.name}
                        image="/H.png"
                        href="#"
                      />
                    ))}
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
