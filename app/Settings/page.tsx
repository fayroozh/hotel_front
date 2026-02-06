"use client";

import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Image from "next/image";

export default function SettingsPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f3f3f3",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* الكارد */}
      <Box
        sx={{
          width: 500,
          minHeight: 600,
          backgroundColor: "#fff",
          border: "1.5px solid #0E5F4F",
          borderRadius: "28px",
          px: 4,
          py: 4,
          direction: "ltr",
          position: "relative",
        }}
      >
        {/* العنوان */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 1,
            mb: 4,
            direction:"rtl",
          }}
        >
          <Typography sx={{ fontSize: 20, fontWeight: 700 ,}}>
            الإعدادات
          </Typography>

          <IconButton
            sx={{
              border: "1px solid #0E5F4F",
              color: "#0E5F4F",
              width: 38,
              height: 38,

            }}
          >
            <EditOutlinedIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* تغيير الاسم */}
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 600,
            mb: 1,
            // textAlign: "right",
            direction:"rtl",
          }}
        >
          تغيير اسم المستخدم :
        </Typography>

        <TextField
          placeholder=""
          fullWidth={false}
          sx={{
            width: "100%",
            mb: 4,
            "& input": {
              textAlign: "right",
            },
          }}
        />

        {/* تغيير الصورة */}
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 600,
            mb: 1.5,
            // textAlign: "right",
            direction:"rtl",

          }}
        >
          تغيير صورة الملف الشخصي :
        </Typography>

        <Button
          sx={{
            width: "100%",
            backgroundColor: "#0E5F4F",
            color: "#fff",
            borderRadius: "10px",
            py: 1.3,
            mb: 4,
            display: "flex",
            flexDirection: "row-reverse",
            gap: 1,
            fontSize: 14,
            "&:hover": {
              backgroundColor: "#09473A",
            },
          }}
        >
          <PhotoCameraOutlinedIcon fontSize="small" />
          الذهاب إلى المعرض
        </Button>

        {/* زر العودة */}
        <Button
          sx={{
            width: "100%",
            backgroundColor: "#0E5F4F",
            color: "#fff",
            borderRadius: "10px",
            py: 1.3,
            display: "flex",
            flexDirection: "row-reverse",
            gap: 1,
            fontSize: 14,
            "&:hover": {
              backgroundColor: "#09473A",
            },
          }}
        >
          <ArrowBackIcon fontSize="small" />
          عودة
        </Button>

        {/* الشعار */}
        <Box
          sx={{
            position: "absolute",
            bottom: 20,
            left: 0,
            right: 0,
            textAlign: "center",
          }}
        >
          <Image
            src="/logo.svg"
            alt="Seramila"
            width={300}
            height={80}
          />
        </Box>
      </Box>
    </Box>
  );
}
