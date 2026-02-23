"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Divider,
  Button,
  CircularProgress,
} from "@mui/material";
import Star from "@mui/icons-material/Star";
import Link from "next/link";
import api, { BACKEND_URL } from "@/lib/api";

interface Hotel {
  id: number;
  name: string;
  location: string;
  stars: number;
  description?: string | null;
  image?: string | null;
}

interface Room {
  id: number;
  type: string;
  price: number;
  capacity: number;
}

export default function HotelDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const hotelRes = await api.get(`/hotels/${id}`);
        const data = hotelRes.data;
        setHotel({
          id: data.id,
          name: data.name,
          location: data.location,
          stars: data.stars,
          description: data.description,
          image: data.image,
        });

        try {
          const roomsRes = await api.get(`/hotels/${id}/rooms`);
          const list = Array.isArray(roomsRes.data) ? roomsRes.data : [];
          setRooms(list);
        } catch {
          setRooms([]);
        }
      } catch {
        router.push("/hotels");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, router]);

  return (
    <Box
      sx={{
        background: "#dfe9e6",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 4,
      }}
    >
      <Box
        sx={{
          width: 1200,
          background: "#FFFFFF",
          borderRadius: "24px",
          p: 4,
          display: "flex",
          flexDirection: "row",
          gap: 4,
        }}
      >
        <Box
          sx={{
            flex: 1,
            background: "#FFFFFF",
            borderRadius: "20px",
            p: 4,
          }}
        >
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Typography fontWeight="bold" mb={2}>
                {hotel?.name || "معلومات الفندق"}
              </Typography>

              <Typography lineHeight={2}>
                الموقع : {hotel?.location || "-"}
                <br />
              </Typography>

              <Box mt={4} display="flex" alignItems="center" gap={1}>
                <Typography fontWeight="bold" sx={{ fontSize: "25px" }}>
                  و لتجربة ممتعة معنا !
                </Typography>
              </Box>

              <Link
                href={
                  rooms.length > 0
                    ? `/booking?roomId=${rooms[0].id}&hotelName=${encodeURIComponent(hotel?.name || '')}`
                    : "/booking"
                }
              >
                <Button
                  fullWidth
                  sx={{
                    mt: 7,
                    background: "#145c45",
                    color: "#fff",
                    borderRadius: "30px",
                    py: 1.2,
                    fontWeight: "bold",
                    "&:hover": { background: "#0f4a38" },
                  }}
                >
                  احجز الآن
                </Button>
              </Link>

              <Link href="/hotels">
                <Button
                  fullWidth
                  sx={{
                    mt: 2,
                    background: "#d91e0f",
                    color: "#fff",
                    borderRadius: "30px",
                    py: 1.2,
                    fontWeight: "bold",
                    "&:hover": { background: "#b71c1c" },
                  }}
                >
                  عودة
                </Button>
              </Link>
            </>
          )}
        </Box>

        <Box
          sx={{
            flex: 1,
            background: "#FFFFFF",
            borderRadius: "20px",
            p: 4,
          }}
        >
          <Typography fontWeight="bold" mb={2}>
            الغرف المتوفرة :
          </Typography>

          {rooms.length === 0 && (
            <Typography>لا توجد غرف متاحة حالياً لهذا الفندق.</Typography>
          )}

          {rooms.map((room) => (
            <Box
              key={room.id}
              sx={{
                mb: 2,
                p: 2,
                borderRadius: "12px",
                border: "1px solid #e0e0e0",
              }}
            >
              <Typography fontWeight="bold">{room.type}</Typography>
              <Typography>
                السعر: {room.price} ل.س{typeof (room as any).capacity !== "undefined" ? ` - السعة: ${(room as any).capacity} أشخاص` : ""}
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Link href={`/booking?roomId=${room.id}&hotelName=${encodeURIComponent(hotel?.name || '')}`}>
                  <Button
                    variant="contained"
                    sx={{ mt: 1, borderRadius: 2, background: "#0F3D2E" }}
                  >
                    احجز هذه الغرفة
                  </Button>
                </Link>
              </Box>
            </Box>
          ))}

          <Divider sx={{ my: 3 }} />

          <Typography fontWeight="bold" mb={1}>
            التصنيف :
          </Typography>

          <Box display="flex" alignItems="center" gap={1}>
            {Array.from({ length: hotel?.stars || 0 }).map((_, index) => (
              <Star key={index} sx={{ color: "#FFD700" }} />
            ))}
          </Box>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Box sx={{ position: "relative" }}>
            <Box
              component="img"
              src={
                hotel?.image
                  ? `${BACKEND_URL}/storage/${hotel.image}`
                  : "/hotel-img/sh.jpeg"
              }
              sx={{
                width: "100%",
                height: 260,
                objectFit: "cover",
                borderRadius: "18px",
              }}
            />

            <Box
              sx={{
                position: "absolute",
                top: 15,
                right: 15,
                background: "#fff",
                borderRadius: "50px",
                px: 2,
                py: 0.5,
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <Star sx={{ color: "#FFD700" }} />
              <Typography fontWeight="bold">
                {hotel?.stars || 0}
              </Typography>
            </Box>
          </Box>

          <Typography mt={5} fontWeight="bold">
            {hotel?.name || ""}
          </Typography>

          <Typography mt={2} lineHeight={1.9}>
            {hotel?.description ||
              "تفاصيل الفندق ستظهر هنا عند توفر البيانات من الخادم."}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
