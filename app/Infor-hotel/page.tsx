"use client";

import {
  Box,
  Typography,
  Divider,
  Button,
  CircularProgress,
} from "@mui/material";
import Star from "@mui/icons-material/Star";
import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import Link from "next/link";
import { useEffect, useState } from "react";
import api from "@/lib/api";

interface Hotel {
  id: number;
  name: string;
  location: string;
  stars: number;
  description?: string | null;
}

export default function InforHotel() {
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // نفترض أن هذا هو فندق شيراتون حلب، مثلاً id = 1
    const fetchHotel = async () => {
      try {
        const res = await api.get("/hotels/1");
        const data = res.data;
        setHotel({
          id: data.id,
          name: data.name,
          location: data.location,
          stars: data.stars,
          description: data.description,
        });
      } catch {
        setHotel(null);
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, []);

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
        {/* البطاقة الكبيرة */}
      <Box
        sx={{
          width: 1200,
          background: "#FFFFFF",
          borderRadius: "24px",
          p: 4,
          display: "flex",
          flexDirection: "row", // 🔥 هون العكس
          gap: 4,
        }}
      >
        {/* ===== معلومات الفندق (يمين) ===== */}
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
                الموقع : {hotel?.location || "مدينة حلب، مقابل ساعة باب الفرج"}
                <br />
                رقم التواصل : +963-992-121-111
              </Typography>
            </>
          )}

          <Typography fontWeight="bold" mt={3} mb={3}>
            مواقع التواصل الاجتماعي :
          </Typography>

          <Box mt={1} display="flex" alignItems="center" gap={1}>
            <Facebook sx={{ color: "#1877F2" }} />
            <Typography>Sheraton Aleppo Hotel</Typography>
          </Box>

          <Box mt={1} display="flex" alignItems="center" gap={1}>
            <Instagram sx={{ color: "#E1306C" }} />
            <Typography>Sheraton_Aleppo_Hotel</Typography>
          </Box>

          <Box mt={4} display="flex" alignItems="center" gap={1}>
            <Typography fontWeight="bold" sx={{fontSize:"25px"}}>
              و لتجربة ممتعة معنا !
            </Typography>
            <ArrowDownward />
          </Box>

          <Link href="/booking">
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
        </Box>

        {/* ===== الخدمات (وسط) ===== */}
        <Box
          sx={{
            flex: 1,
            background: "#FFFFFF",
            borderRadius: "20px",
            p: 4,
          }}
        >
          <Typography fontWeight="bold" mb={2}>
            الخدمات المتوفرة :
          </Typography>

          <Typography lineHeight={2}>
            • انترنت سريع و مجاني <br />
            • نادي رياضي <br />
            • كافيه و مطعم <br />
            • باركينغ <br />
            • خدمة غرف 24 ساعة <br />
            • صالة أعراس <br />
            • غرف اجتماعات
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography fontWeight="bold" mb={1}>
            الأسعار :
          </Typography>

          <Typography lineHeight={2}>
            • غرفة مفردة $100 <br />
            • غرفة مزدوجة $200 <br />
            • جناح صغير $300 <br />
            • جناح مزدوج $400
          </Typography>
        </Box>

        {/* ===== الصورة (يسار) ===== */}
        <Box sx={{ flex: 1 }}>
          <Box sx={{ position: "relative" }}>
            <Box
              component="img"
              src="/hotel-img/sh.jpeg"
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
              <Typography fontWeight="bold">5</Typography>
            </Box>
          </Box>

          <Typography mt={5} fontWeight="bold">
            {hotel?.name || "شيراتون"} :
          </Typography>

          <Typography mt={2} lineHeight={1.9}>
            {hotel?.description ||
              "فندق خمس نجوم يقع في مدينة حلب القديمة، بالقرب من المعالم التاريخية. يجمع بين الفخامة الكلاسيكية والطابع الشرقي القديم للمباني الحلبية، حيث يجمع بين واجهة تاريخية تعود للقرن الـ15 مع مساحات داخلية عصرية."}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
