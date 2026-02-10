import { Box, Container, Grid } from "@mui/material";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";

export default function ContactSection() {
  return (
    <Box sx={{ pt: 10, pb: 0 }}>

      <Container maxWidth="lg">
        <Grid
          container
          alignItems="flex-start"
          justifyContent="space-between" // ✅ المطلوب
          direction="row-reverse"        // ✅ RTL
        >
          {/* الفورم (يسار) */}
          <Grid size={{ xs: 12, md: 5.5 }}>
            <ContactForm />
          </Grid>

          {/* معلومات التواصل (يمين) */}
          <Grid size={{ xs: 12, md: 5 }}>
            <ContactInfo />
          </Grid>
        </Grid>
      </Container>

      {/* الشريط الأخضر السفلي */}
      <Box
        sx={{
          mt: 10,
          backgroundColor: "#0E5F4F",
          py: 2.5,
          textAlign: "center",
          color: "#fff",
          fontSize: "14px",
          fontWeight: 500,
        }}
      >
         جميع الحقوق محفوظة 2026©  
      </Box>
    </Box>
  );
}
