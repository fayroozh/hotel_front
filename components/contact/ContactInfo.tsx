import { Box, Typography, Grid } from "@mui/material";
import Image from "next/image";

export default function ContactInfo() {
  return (
    <Box
      className="auth-rtl" // ✅ RTL جاهز
      sx={{
        direction: "rtl",
        textAlign: "right",

        // ✅ كل Typography يمين تلقائي
        "& .MuiTypography-root": {
          textAlign: "right",
        },
      }}
    >
{/* Logo */}
<Box
  sx={{
    mb: 11,
    mt: -2,
    display: "flex",
    justifyContent: "flex-end",
  }}
>
  <Image src="/logo.svg" alt="Seramila" width={349} height={210} />
</Box>


      {/* Content */}
      <Grid container spacing={1}>
        {/* خدماتنا */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "24px",
              mb: 2,
            }}
          >
            خدماتنا
          </Typography>

          <Typography
            sx={{
              fontSize: "18px",
              color: "#444",
              lineHeight: 2,
            }}
          >
             حجز فنادق في سوريا&nbsp;&nbsp;•<br /> 
             عرض الفنادق المتاحة &nbsp;&nbsp;•<br />
             متابعة وتأكيد الحجوزات&nbsp;&nbsp;•<br />
               دعم في مشاكل الحجز والدفع&nbsp;&nbsp;•
          </Typography>
        </Grid>

        {/* التواصل */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "24px",
              mb: 2,
            }}
          >
            التواصل
          </Typography>

          <Typography
            sx={{
              fontSize: "18px",
              color: "#444",
              lineHeight: 2,
            }}
          >
             الاسم الكامل &nbsp;&nbsp;•<br />
             رقم الهاتف &nbsp;&nbsp;•<br />
             البريد الإلكتروني &nbsp;&nbsp;•<br />
             رسالتك / استفسارك&nbsp;&nbsp;•
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
