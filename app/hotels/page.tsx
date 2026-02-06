"use client";

import { useEffect, useState, Suspense } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import HotelCard from "@/components/hotels/HotelCard";
import Link from "next/link";
import Button from "@mui/material/Button";
import api from "@/lib/api";
import { CircularProgress } from "@mui/material";
import { useSearchParams } from "next/navigation";

interface Hotel {
  id: number;
  name: string;
  location: string;
  stars: number;
}

function HotelsContent() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      try {
        let endpoint = '/hotels';
        const params: any = {};
        
        if (searchQuery) {
          endpoint = '/hotels/search';
          params.search = searchQuery;
        }

        const response = await api.get(endpoint, { params });
        if (Array.isArray(response.data)) {
           setHotels(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch hotels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [searchQuery]);

  return (
    <>
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
          {searchQuery ? `نتائج البحث عن: ${searchQuery}` : "الفنادق المتوفرة"}
        </Typography>

        {/* البطاقات */}
        {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', minHeight: '300px' }}>
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
                gap: "32px",
                justifyItems: "center",
            }}
            >
            {hotels.length > 0 ? (
                hotels.map((hotel) => (
                    <HotelCard
                    key={hotel.id}
                    title={hotel.name}
                    image={"/H.png"} // Default image
                    />
                ))
            ) : (
                <Typography sx={{ color: '#fff', fontSize: '20px', gridColumn: '1/-1', textAlign: 'center' }}>
                    لا توجد فنادق تطابق بحثك
                </Typography>
            )}
            </Box>
        )}
    </>
  );
}

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
        <Suspense fallback={<CircularProgress sx={{ color: '#fff' }} />}>
            <HotelsContent />
        </Suspense>
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
