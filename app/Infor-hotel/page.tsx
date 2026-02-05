'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Box, Typography, Button, Divider } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

type Social = { name: "facebook" | "instagram"; url: string };
type Hotel = {
  id: string;
  name: string;
  description: string;
  services: string[];
  prices: string[];
  location: string;
  phone: string;
  socials: Social[];
  image: string;
};

export default function InforHotel() {
  const params = useParams();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // جلب البيانات الحقيقية من API
    fetch(`/https://hotel-booking.xo.je/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setHotel(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("خطأ بجلب بيانات الفندق:", err);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) return <p style={{ padding: 40 }}>جارٍ تحميل بيانات الفندق...</p>;
  if (!hotel) return <p style={{ padding: 40 }}>لم يتم العثور على الفندق.</p>;

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#F5F5F5", display: "flex", justifyContent: "center", px: 6, py: 6 }}>
      <Box sx={{ width: "100%", maxWidth: 1400, display: "flex", flexWrap: "wrap", gap: 4 }}>
        
        {/* العمود الأيمن - الصورة + وصف */}
        <Box sx={{ flex: 1, textAlign: "right" }}>
          <Box sx={{ height: 300, borderRadius: 2, overflow: "hidden", mb: 2 }}>
            <img
              src={hotel.image}
              alt={hotel.name}
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "12px" }}
            />
          </Box>
          <Typography>{hotel.description}</Typography>
        </Box>

        {/* العمود الأوسط - الخدمات + الأسعار */}
        <Box sx={{ flex: 1, textAlign: "right" }}>
          <Typography fontWeight={700} mb={1}>الخدمات:</Typography>
          <ul>
            {hotel.services.map((s, i) => <li key={i}>{s}</li>)}
          </ul>

          <Divider sx={{ my: 2 }} />

          <Typography fontWeight={700} mb={1}>الأسعار:</Typography>
          <ul>
            {hotel.prices.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </Box>

        {/* العمود الأيسر - الموقع + الهاتف + السوشيال + الحجز */}
        <Box sx={{ flex: 1, textAlign: "right" }}>
          <Typography> {hotel.location}</Typography>
          <Typography> {hotel.phone}</Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, my: 2 }}>
            {hotel.socials.map((s, i) => (
              <a
                key={i}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", color: "#045746" }}
              >
                {s.name === "facebook" ? <FacebookIcon sx={{ mr: 1 }} /> : <InstagramIcon sx={{ mr: 1 }} />}
                {s.name.charAt(0).toUpperCase() + s.name.slice(1)}
              </a>
            ))}
          </Box>

          <Button sx={{ mt: 2, backgroundColor: "#045746", color: "#fff", borderRadius: 2, px: 3, py: 1, "&:hover": { backgroundColor: "#09473A" } }}>
            احجز الآن
          </Button>
        </Box>

      </Box>
    </Box>
  );
}