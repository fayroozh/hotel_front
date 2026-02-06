'use client';

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

type Props = {
  name: string;
  description: string;
  services: string[];
  prices: string[];
  location: string;
  phone: string;
  socials: string[];
};

export default function HotelCard({
  name,
  description,
  services,
  prices,
  location,
  phone,
}: Props) {
  const [image, setImage] = useState("");

  useEffect(() => {
    const randomId = Math.floor(Math.random() * 1000);
    setImage(`https://picsum.photos/id/${randomId}/800/500`);
  }, []);

  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: "20px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        p: 3,
        direction: "rtl",
      }}
    >
      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
        {/* العمود الأيمن — الصورة + وصف */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            textAlign: "right",
          }}
        >
          <Box
            sx={{
              height: "230px",
              borderRadius: "15px",
              overflow: "hidden",
              mb: 1,
            }}
          >
            {image && (
              <CardMedia
                component="img"
                image={image}
                alt={name}
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}
          </Box>

          <Typography sx={{ fontSize: "14px", color: "#444", textAlign: "right" }}>
            {description}
          </Typography>
        </Box>

        {/* العمود الأوسط — الخدمات + الأسعار */}
        <Box
          sx={{
            flex: 1,
            px: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            textAlign: "right",
          }}
        >
          <Typography sx={{ fontWeight: 700, mb: 1 }}>الخدمات المتوفرة</Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, alignItems: "flex-end" }}>
            {services.map((s, i) => (
              <Typography
                key={i}
                sx={{
                  fontSize: "13px",
                  textAlign: "right",
                  '&::before': {
                    content: '"•"',
                    display: 'inline-block',
                    width: '1em',
                    marginLeft: '0.5em',
                    color: '#045746',
                  },
                }}
              >
                {s}
              </Typography>
            ))}
          </Box>

          <Box sx={{ my: 2 }} />

          <Typography sx={{ fontWeight: 700, mb: 1 }}>الأسعار</Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, alignItems: "flex-end" }}>
            {prices.map((p, i) => (
              <Typography
                key={i}
                sx={{
                  fontSize: "13px",
                  textAlign: "right",
                  '&::before': {
                    content: '"•"',
                    display: 'inline-block',
                    width: '1em',
                    marginLeft: '0.5em',
                    color: '#045746',
                  },
                }}
              >
                {p}
              </Typography>
            ))}
          </Box>
        </Box>

        {/* العمود الأيسر — معلومات + روابط + زر */}
        <Box
        sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-end",
            textAlign: "right",
          }}
        >
          <Box sx={{ textAlign: "right" }}>
            <Typography sx={{ fontWeight: 700, mb: 1 }}>{name}</Typography>

            <Typography sx={{ fontSize: "13px", mb: 0.5 }}> {location}</Typography>
            <Typography sx={{ fontSize: "13px", mb: 1 }}> {phone}</Typography>

            {/* روابط التواصل — عمودي وأقصى اليمين */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                mt: 1,
                alignItems: "flex-end",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography sx={{ fontSize: "13px" }}>Facebook</Typography>
                <FacebookIcon sx={{ color: "#1877F2" }} />
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography sx={{ fontSize: "13px" }}>Instagram</Typography>
                <InstagramIcon sx={{ color: "#E4405F" }} />
              </Box>
            </Box>
          </Box>

          {/* زر الحجز — أقصى اليمين */}
          <Button
            sx={{
              width: "140px",
              mt: 2,
              alignSelf: "flex-end",
              backgroundColor: "#045746",
              color: "#fff",
              borderRadius: "12px",
              "&:hover": { backgroundColor: "#09473A" },
            }}
          >
            احجز الآن
          </Button>
        </Box>
      </Box>
    </Card>
  );
}