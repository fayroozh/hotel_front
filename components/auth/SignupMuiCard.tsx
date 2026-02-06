"use client";

import * as React from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  FormControl,
  OutlinedInput,
  FormHelperText,
  Snackbar,
  Alert,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import api from "@/lib/api";

const inputRtlSx = {
  "& input": {
    direction: "rtl !important",
    textAlign: "right !important",
    unicodeBidi: "plaintext",
  },
};

// ✅ شروط التحقق
const schema = z
  .object({
    name: z.string().min(1, "الاسم مطلوب"),
    email: z
      .string()
      .min(1, "البريد الإلكتروني مطلوب")
      .email("أدخلي بريد إلكتروني صحيح (مثال: name@gmail.com)"),
    password: z.string().min(6, "كلمة المرور لازم تكون 6 أحرف على الأقل"),
    confirmPassword: z.string().min(1, "تأكيد كلمة المرور مطلوب"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["confirmPassword"],
  });
  

type FormValues = z.infer<typeof schema>;

export default function SignupMuiCard() {
  const [successOpen, setSuccessOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange", // ✅ يتحقق أثناء الكتابة
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: FormValues) => {
    setErrorMessage(null);
    try {
      // Proxy handles CORS. We just post to /register (becomes /api/register via baseURL)
      const response = await api.post("/register", {
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.confirmPassword,
      });
      
      if (response.data.access_token) {
        localStorage.setItem("token", response.data.access_token);
      }
      
      const userResponse = await api.get("/user");
      
      localStorage.setItem("user", JSON.stringify(userResponse.data));
      localStorage.setItem("isLoggedIn", "true");

      setSuccessOpen(true);
reset();

setTimeout(() => {
  router.push("/homePage"); 
}, 1000);
      
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
     } catch (error: any) {
       console.error("Signup error:", error);
       setErrorMessage(error.response?.data?.message || "فشل إنشاء الحساب. يرجى المحاولة مرة أخرى.");
     }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        overflow: "hidden",
        borderRadius: 3,
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
        backgroundColor: "#fff",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          minHeight: { xs: "auto", md: 560 },
        }}
      >
        {/* يمين: الفورم */}
        <Box
          className="auth-rtl"
          sx={{
            p: { xs: 3, md: 5 },
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 520 }}>
            {/* اللوجو */}
            <Box
              sx={{
                mt: -16,
                mb: 3,
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                component="img"
                src="/logo.svg"
                alt="Seramila"
                sx={{ height: 130, width: "auto" }}
              />
            </Box>

            <Typography sx={{ fontSize: 32, fontWeight: 700 }}>
              إنشاء حساب جديد
            </Typography>

            <Typography
              variant="body2"
              sx={{
                fontSize: 22,
                mt: 1.5,
                color: "text.secondary",
                lineHeight: 1.9,
              }}
            >
              قم بإنشاء حسابك الخاص للبحث عن الفنادق الموجودة داخل المحافظات
              السورية
            </Typography>

            {/* ✅ فورم مع منع إرسال إلا إذا صالح */}
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 4, display: "grid", gap: 2 }}
            >
              {errorMessage && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {errorMessage}
                </Alert>
              )}

              <Typography
                variant="caption"
                sx={{ fontSize: 20, fontWeight: 600 }}
              >
                الاسم
              </Typography>

              <FormControl fullWidth error={!!errors.name}>
                <OutlinedInput
                  type="text"
                  inputProps={{ dir: "rtl" }}
                  sx={inputRtlSx}
                  {...register("name")}
                />
                <FormHelperText sx={{ fontSize: 14 }}>
                  {errors.name?.message}
                </FormHelperText>
              </FormControl>

              <Typography
                variant="caption"
                sx={{ fontSize: 20, fontWeight: 600 }}
              >
                البريد الالكتروني
              </Typography>

              <FormControl fullWidth error={!!errors.email}>
                <OutlinedInput
                  type="email"
                  inputProps={{ dir: "rtl" }}
                  sx={inputRtlSx}
                  {...register("email")}
                />
                <FormHelperText sx={{ fontSize: 14 }}>
                  {errors.email?.message}
                </FormHelperText>
              </FormControl>

              <Typography
                variant="caption"
                sx={{ fontSize: 20, fontWeight: 600 }}
              >
                كلمة المرور
              </Typography>

              <FormControl fullWidth error={!!errors.password}>
                <OutlinedInput
                  type="password"
                  inputProps={{ dir: "rtl" }}
                  sx={inputRtlSx}
                  {...register("password")}
                />
                <FormHelperText sx={{ fontSize: 14 }}>
                  {errors.password?.message}
                </FormHelperText>
              </FormControl>

              <Typography
                variant="caption"
                sx={{ fontSize: 20, fontWeight: 600 }}
              >
                تأكيد كلمة المرور
              </Typography>

              <FormControl fullWidth error={!!errors.confirmPassword}>
                <OutlinedInput
                  type="password"
                  inputProps={{ dir: "rtl" }}
                  sx={inputRtlSx}
                  {...register("confirmPassword")}
                />
                <FormHelperText sx={{ fontSize: 14 }}>
                  {errors.confirmPassword?.message}
                </FormHelperText>
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isValid || isSubmitting}
                sx={{ fontSize: 20, mt: 1, borderRadius: 2 }}
              >
                إنشاء حساب
              </Button>
            </Box>
          </Box>
        </Box>

        {/* يسار: الصور */}
        <Box
          sx={{
            p: { xs: 3, md: 5 },
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: 430, display: "flex", flexDirection: "column", gap: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
              <Box
                sx={{
                  width: 180,
                  height: 470,
                  borderRadius: 1,
                  border: "0.5px solid #0F3D2E",
                  overflow: "hidden",
                  backgroundImage:
                    "linear-gradient(rgba(15,61,46,0.20), rgba(15,61,46,0.20)), url(/auth/b.png)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <Box
                sx={{
                  width: 250,
                  height: 470,
                  borderRadius: 1,
                  border: "0.5px solid #0F3D2E",
                  overflow: "hidden",
                  backgroundImage:
                    "linear-gradient(rgba(15,61,46,0.20), rgba(15,61,46,0.20)), url(/auth/a.png)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
              <Box
                sx={{
                  width: 300,
                  height: 320,
                  borderRadius: 1,
                  border: "0.5px solid #0F3D2E",
                  overflow: "hidden",
                  backgroundImage:
                    "linear-gradient(rgba(15,61,46,0.20), rgba(15,61,46,0.20)), url(/auth/d.png)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <Box
                sx={{
                  width: 130,
                  height: 320,
                  borderRadius: 1,
                  border: "0.5px solid #0F3D2E",
                  overflow: "hidden",
                  backgroundImage:
                    "linear-gradient(rgba(15,61,46,0.20), rgba(15,61,46,0.20)), url(/auth/b.png)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ✅ رسالة نجاح بعد الإرسال */}
      <Snackbar
        open={successOpen}
        autoHideDuration={3000}
        onClose={() => setSuccessOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSuccessOpen(false)}
          severity="success"
          variant="filled"
        >
          تم إنشاء الحساب بنجاح 
        </Alert>
      </Snackbar>
    </Paper>
  );
}
