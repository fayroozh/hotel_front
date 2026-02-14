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
    fontSize: "20px",
  },
};

// ✅ شروط التحقق لتسجيل الدخول
const schema = z.object({
  email: z
    .string()
    .min(1, "البريد الإلكتروني مطلوب")
    .email("أدخلي بريد إلكتروني صحيح (مثال: name@gmail.com)"),
  password: z.string().min(6, "كلمة المرور لازم تكون 6 أحرف على الأقل"),
});

type FormValues = z.infer<typeof schema>;

export default function LoginMuiCard() {
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
    mode: "onChange",
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: FormValues) => {
    setErrorMessage(null);
    try {
      localStorage.setItem("user", JSON.stringify({ email: data.email }));
    } catch {}

    try {
      const response = await api.post(`/login`, data, {
        headers: { Accept: "application/json" },
      });

      // ✅ تخزين التوكن
      if (response.data.access_token) {
        localStorage.setItem("token", response.data.access_token);
      }

      // ✅ تخزين بيانات المستخدم مباشرة من نفس response
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      } else {
        // fallback في حال السيرفر ما رجّع user
        localStorage.setItem(
          "user",
          JSON.stringify({ email: data.email })
        );
      }

      localStorage.setItem("isLoggedIn", "true");

      setSuccessOpen(true);
      reset();

      setTimeout(() => {
        router.push("/homePage");
      }, 1000);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      console.error("Login error:", error);
      setErrorMessage(
        err.response?.data?.message ||
          "فشل تسجيل الدخول. يرجى المحاولة مرة أخرى."
      );
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
              تسجيل الدخول
            </Typography>

            <Typography
              sx={{
                mt: 1.2,
                color: "text.secondary",
                lineHeight: 1.9,
                fontSize: 22,
              }}
            >
              قم بتسجيل دخولك الى موقعنا للتعرف على الفنادق الموجودة ضمن المحافظات
              السورية
            </Typography>

            {/* الفورم */}
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

              <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
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

              <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
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

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isValid || isSubmitting}
                sx={{
                  mt: 1,
                  borderRadius: 2,
                  py: 1.1,
                  fontWeight: 700,
                  fontSize: 20,
                }}
              >
                تسجيل الدخول
              </Button>

              <Typography sx={{ mt: 2, fontSize: 20, fontWeight: 700 }}>
                تسجيل الدخول عن طريق :
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 3,
                  mt: 1,
                }}
              >
                {[
                  {
                    src: "/icons/facebook.svg",
                    alt: "Facebook",
                    href: "https://www.facebook.com",
                  },
                  {
                    src: "/icons/twitter.svg",
                    alt: "X",
                    href: "https://twitter.com",
                  },
                  {
                    src: "/icons/google.svg",
                    alt: "Google",
                    href: "https://accounts.google.com",
                  },
                ].map((icon) => (
                  <Box
                    key={icon.alt}
                    component="a"
                    href={icon.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      width: 46,
                      height: 46,
                      borderRadius: "50%",
                      border: "1px solid rgba(0,0,0,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "transform 150ms ease, box-shadow 150ms ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 18px rgba(0,0,0,0.10)",
                      },
                      textDecoration: "none",
                    }}
                  >
                    <Box
                      component="img"
                      src={icon.src}
                      alt={icon.alt}
                      sx={{ width: 22, height: 22 }}
                    />
                  </Box>
                ))}
              </Box>
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
          <Box
            sx={{
              width: 430,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 1,
              }}
            >
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

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 1,
              }}
            >
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
          تم تسجيل الدخول بنجاح
        </Alert>
      </Snackbar>
    </Paper>
  );
}
