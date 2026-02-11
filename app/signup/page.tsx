// استدعاء Box من مكتبة MUI لاستخدامه كحاوية بتنسيق جاهز
import { Box } from "@mui/material";

// استدعاء كومبوننت الفورم تبع إنشاء الحساب
import SignupMuiCard from "@/components/auth/SignupMuiCard";

// هاي الصفحة الخاصة بإنشاء الحساب
export default function SignupPage() {
  return (
    // الحاوية الرئيسية للصفحة
    <Box
      sx={{
        minHeight: "100vh", // تخلي الصفحة تاخد كامل ارتفاع الشاشة
        backgroundColor: "#F5F5F5", // لون خلفية فاتح
        display: "flex", // استخدام flex لترتيب العناصر
        alignItems: "center", // توسيط عمودي
        justifyContent: "center", // توسيط أفقي
        px: 2, // مسافة أفقية
        py: 6, // مسافة عمودية
      }}
    >
      {/* حاوية داخلية لتحديد عرض الفورم */}
      <Box sx={{ width: "100%", maxWidth: 1100 }}>
        {/* استدعاء كومبوننت إنشاء الحساب */}
        <SignupMuiCard />
      </Box>
    </Box>
  );
}