"use client";

import {
  Box,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import Star from "@mui/icons-material/Star";
import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import Link from "next/link";

export default function HotelPage() {
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
          flexDirection: "row",
          gap: 4,
        }}
      >
        {/* ===== معلومات الفندق (يمين) ===== */}
        <Box sx={{ flex: 1, p: 4 }}>
          <Typography fontWeight="bold" mb={2}>
            معلومات الفندق :
          </Typography>

          <Typography lineHeight={2}>
            الموقع : مدينة اللاذقية - الشاطئ الأزرق <br />
            رقم التواصل : +963-960-900-999
          </Typography>

          <Typography fontWeight="bold" mt={3} mb={3}>
            مواقع التواصل الاجتماعي :
          </Typography>

          <Box mt={1} display="flex" alignItems="center" gap={1}>
            <Facebook sx={{ color: "#1877F2" }} />
            <Typography>Golden Beach</Typography>
          </Box>

          <Box mt={1} display="flex" alignItems="center" gap={1}>
            <Instagram sx={{ color: "#E1306C" }} />
            <Typography>Golden_Beach</Typography>
          </Box>

          <Box mt={4} display="flex" alignItems="center" gap={1}>
            <Typography fontWeight="bold" sx={{ fontSize: "25px" }}>
              و لتجربة ممتعة، هيا بنا
            </Typography>
            <ArrowDownward />
          </Box>

          <Link href="/booking">
            <Button
              fullWidth
              sx={{
                mt: 7,
                background: "#0F5E4E",
                color: "#fff",
                borderRadius: "30px",
                py: 1.2,
                fontWeight: "bold",
                "&:hover": { background: "#0c4c3e" },
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
                background: "#D91E0F",
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
        <Box sx={{ flex: 1, p: 4 }}>
          <Typography fontWeight="bold" mb={2}>
            الخدمات المتوفرة :
          </Typography>

          <Typography lineHeight={2}>
            • انترنت سريع ومجاني <br />
            • نادي رياضي <br />
            • مطعم ومقهى <br />
            • باركينغ <br />
            • كهرباء 24 ساعة <br />
            • قاعة فخمة لكافة المناسبات <br />
            • تراس خارجي
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography fontWeight="bold" mb={1}>
            الأسعار :
          </Typography>

          <Typography lineHeight={2}>
            • غرفة مفردة $90 <br />
            • غرفة مزدوجة $160 <br />
            • جناح مفرد $270 <br />
            • جناح مزدوج $350
          </Typography>
        </Box>

        {/* ===== الصورة (يسار) ===== */}
        <Box sx={{ flex: 1 }}>
          <Box sx={{ position: "relative" }}>
            <Box
              component="img"
              src="/hotel-img/go.jpeg"   // تأكد أن الصورة موجودة بهذا الاسم
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
            غولدن بيش :
          </Typography>

          <Typography mt={2} lineHeight={1.9}>
            يقع في قلب المنطقة السياحية شمال اللاذقية،
            ويضم 63 غرفة و6 أجنحة فاخرة.
            يوفر لضيوفه إقامة مريحة بإطلالة ساحرة على البحر
            وحدائق خلابة ومناظر طبيعية بمساحة إجمالية تبلغ 1400 م².
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
