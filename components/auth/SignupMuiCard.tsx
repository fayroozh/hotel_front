"use client"; 
// يعني هاد الكومبوننت رح يشتغل على المتصفح (Client) لأنه فيه state و localStorage و router

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
// عناصر جاهزة من MUI لبناء واجهة الفورم بشكل مرتب

import { useForm } from "react-hook-form";
// مكتبة لإدارة الفورم والتحقق من المدخلات بسهولة

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// Zod لتعريف قواعد التحقق + ربطها مع react-hook-form

import { useRouter } from "next/navigation";
// للتنقل بين الصفحات بعد نجاح التسجيل

import api from "@/lib/api";
// axios instance جاهز ومربوط بـ baseURL وبيحط التوكن تلقائياً إذا موجود

// تنسيق RTL لحقول الإدخال (حتى الكتابة تكون من اليمين)
const inputRtlSx = {
  "& input": {
    direction: "rtl !important",
    textAlign: "right !important",
    unicodeBidi: "plaintext",
  },
};

// قواعد التحقق من البيانات قبل إرسال الفورم
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
  // شرط إضافي: كلمة المرور وتأكيدها لازم يتطابقوا
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;
// استخدمنا z.infer حتى نستخرج نوع البيانات من الـ schema مباشرة

export default function SignupMuiCard() {
  // لعرض رسالة نجاح
  const [successOpen, setSuccessOpen] = React.useState(false);
  // لتخزين رسالة خطأ من السيرفر إذا فشل التسجيل
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const router = useRouter();

  // إعداد الفورم وربطه مع التحقق باستخدام Zod
  const {
    register, // لربط input مع الفورم
    handleSubmit, // لتشغيل submit بطريقة صحيحة
    reset, // لتفريغ الحقول بعد النجاح
    formState: { errors, isValid, isSubmitting }, // أخطاء + صلاحية الفورم + حالة الإرسال
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange", // التحقق يصير أثناء الكتابة
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
    //القيم الابتدائية للفورم لما الصفحة تفتح تكون فاضية
  });

  // عند إرسال الفورم
  const onSubmit = async (data: FormValues) => {
    setErrorMessage(null);

    try {
      // إرسال بيانات التسجيل للباك إند
      const response = await api.post("/register", {
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.confirmPassword,
      });

      // إذا رجع السيرفر توكن، منخزنه حتى نستخدمه بالطلبات القادمة
      if (response.data.access_token) {
        localStorage.setItem("token", response.data.access_token);
      }

      // جلب بيانات المستخدم بعد التسجيل (مثلاً الاسم/الايميل/الدور...)
      const userResponse = await api.get("/user");

      // تخزين بيانات المستخدم وحالة تسجيل الدخول
      //يعني خزّنا بيانات المستخدم بالجهاز
      localStorage.setItem("user", JSON.stringify(userResponse.data));
      //localStorage ما بيخزن اوبجيكت لذلك استخدمنا دالة النص
      localStorage.setItem("isLoggedIn", "true");
      

      // عرض رسالة نجاح
      setSuccessOpen(true);

      // تفريغ الحقول
      reset();

      // بعد ثانية نوديه عالصفحة الرئيسية
      setTimeout(() => {
        router.push("/homePage");
      }, 1000);

    } catch (error: any) {
      // في حال فشل التسجيل (مثلاً ايميل مستخدم)
      console.error("Signup error:", error);
      setErrorMessage(
        error.response?.data?.message || "فشل إنشاء الحساب. يرجى المحاولة مرة أخرى."
      );
    }
  };

  return (
    <Paper
    //الإطار الخارجي للفورم كله
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
        {/* جزء الفورم */}
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
            {/* //هاد Box هو حاوية للفورم */}
            {/* لوجو */}
            {/* //هاد Box مسؤول عن ترتيب اللوجو */}
            <Box sx={{ mt: -8, mb: 3, width: "100%", display: "flex", justifyContent: "center" }}>
              <Box component="img" src="/logo.svg" alt="Seramila" sx={{ height: 130, width: "auto" }} />
            </Box>

            <Typography sx={{ fontSize: 32, fontWeight: 700 }}>
              إنشاء حساب جديد
            </Typography>

            <Typography variant="body2" sx={{ fontSize: 22, mt: 1.5, color: "text.secondary", lineHeight: 1.9 }}>
              قم بإنشاء حسابك الخاص للبحث عن الفنادق الموجودة داخل المحافظات السورية
            </Typography>

            {/* فورم التسجيل */}
            <Box
              component="form"
              //استخدمنا Box بس غيرنا نوعه إلى form
              onSubmit={handleSubmit(onSubmit)}
              //هو المسؤول يتأكد إن الفورم صحيح
              //وبعدين يشغل دالة onSubmit
              noValidate
              //هاد بيعطّل التحقق الافتراضي تبع المتصفح
              //لأن نحنا عم نستخدم Zod + react-hook-form
              //فما بدنا تحقق HTML التقليدي
              sx={{ mt: 4, display: "grid", gap: 2 }}
            >
              {/* رسالة خطأ عامة من السيرفر */}
              {errorMessage && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {errorMessage}
                </Alert>
              )}
              {/* //إذا في رسالة خطأ → اعرض Alert
              //إذا ما في → لا تعرض شي */}

              {/* الاسم */}
              <Typography variant="caption" sx={{ fontSize: 20, fontWeight: 600 }}>الاسم</Typography>
              <FormControl fullWidth error={!!errors.name}>
                {/* //هاد غلاف للحقل
                //error={!!errors.name}
                //إذا في خطأ بحقل الاسم → يصير لونه أحمر
                //!! بتحوله لقيمة boolean (true / false) */}
                <OutlinedInput type="text" inputProps={{ dir: "rtl" }} sx={inputRtlSx}
                {...register("name")}//هاد بيربط الحقل مع react-hook-form..يخزن قيمته..يطبق التحقق عليه
     
               />
                <FormHelperText sx={{ fontSize: 14 }}>
                  {errors.name?.message}
                  {/* //إذا الاسم فاضيZod رح يعطي رسالة */}
                </FormHelperText>
              </FormControl>

              {/* البريد */}
              <Typography variant="caption" sx={{ fontSize: 20, fontWeight: 600 }}>البريد الالكتروني</Typography>
              <FormControl fullWidth error={!!errors.email}>
                {/* //هاد غلاف للحقل
                //error={!!errors.name}
                //إذا في خطأ بحقل الاسم → يصير لونه أحمر
                //!! بتحوله لقيمة boolean (true / false) */}
                <OutlinedInput type="email" inputProps={{ dir: "rtl" }} sx={inputRtlSx}
                 {...register("email")} >
                  {/* هاد بيربط الحقل مع react-hook-form..يخزن قيمته..يطبق التحقق عليه */}
                 </OutlinedInput>
                <FormHelperText sx={{ fontSize: 14 }}>
                  {/* //إذا الاسم فاضيZod رح يعطي رسالة */}
                  {errors.email?.message}

                </FormHelperText>
              </FormControl>

              {/* كلمة المرور */}
              <Typography variant="caption" sx={{ fontSize: 20, fontWeight: 600 }}>كلمة المرور</Typography>
              <FormControl fullWidth error={!!errors.password}>
                <OutlinedInput type="password" inputProps={{ dir: "rtl" }} sx={inputRtlSx} {...register("password")} />
                <FormHelperText sx={{ fontSize: 14 }}>{errors.password?.message}</FormHelperText>
              </FormControl>

              {/* تأكيد كلمة المرور */}
              <Typography variant="caption" sx={{ fontSize: 20, fontWeight: 600 }}>تأكيد كلمة المرور</Typography>
              <FormControl fullWidth error={!!errors.confirmPassword}>
                <OutlinedInput type="password" inputProps={{ dir: "rtl" }} sx={inputRtlSx} {...register("confirmPassword")} />
                <FormHelperText sx={{ fontSize: 14 }}>{errors.confirmPassword?.message}</FormHelperText>
              </FormControl>

              {/* زر الإرسال: يتعطل إذا الفورم غير صالح أو عم يرسل */}
              <Button
                type="submit"
                //رح يمر أولًا على التحقق، وإذا كل شي صحيح يشغل onSubmit
                variant="contained"
                // زر مع خلفية ملونةهي من mui
                color="primary"
                disabled={!isValid || isSubmitting}
                //تشغيل و تعطيل الزر
                //isValid جاي من react-hook-form
                //معناه: هل الفورم صحيح حسب شروط Zod?
                //إذا في خطأ → false
                //إذا كل شي تمام → true
                //إذا الفورم غير صالح → عطّل الزر
                // isSubmitting
                //هاد بيصير true أثناء إرسال البيانات للباك 
                //يعني الزر يتعطل في حالتين
                //الفورم فيه أخطاء + الفورم حاليًا عم يرسل
                sx={{ fontSize: 20, mt: 1, borderRadius: 2 }}
              >
                إنشاء حساب
              </Button>
            </Box>
          </Box>
        </Box>






{/* يسار: الصور */}
 <Box sx={{ p: { xs: 3, md: 5 },
  display: "flex", justifyContent: "center", }} >
     <Box sx={{ width: 430, display: "flex",
       flexDirection: "column", gap: 1 }}> 
       <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}> 
        <Box sx={{ width: 180, height: 470, borderRadius: 1,
           border: "0.5px solid #0F3D2E", overflow: "hidden", 
           backgroundImage: "linear-gradient(rgba(15,61,46,0.20), rgba(15,61,46,0.20)), url(/auth/b.png)",
            backgroundSize: "cover", backgroundPosition: "center", }} /> 
            <Box sx={{ width: 250, height: 470, borderRadius: 1,
               border: "0.5px solid #0F3D2E", overflow: "hidden",
                backgroundImage: "linear-gradient(rgba(15,61,46,0.20), rgba(15,61,46,0.20)), url(/auth/a.png)",
                 backgroundSize: "cover", backgroundPosition: "center", }} />
                  </Box> <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}> 
                    <Box sx={{ width: 300, height: 320, borderRadius: 1, border: "0.5px solid #0F3D2E",
                       overflow: "hidden", backgroundImage: "linear-gradient(rgba(15,61,46,0.20), rgba(15,61,46,0.20)), url(/auth/d.png)",
                        backgroundSize: "cover", backgroundPosition: "center", }} /> 
                        <Box sx={{ width: 130, height: 320, borderRadius: 1, border: "0.5px solid #0F3D2E",
                           overflow: "hidden", backgroundImage: "linear-gradient(rgba(15,61,46,0.20), rgba(15,61,46,0.20)), url(/auth/b.png)", 
                           backgroundSize: "cover", backgroundPosition: "center", }} />
                            </Box>
                             </Box>
                              </Box>
                               </Box>


        {/* جزء الصور (تصميم فقط) */}
        <Box sx={{ p: { xs: 3, md: 5 }, display: "flex", justifyContent: "center" }}>
          {/* صور ثابتة كخلفية/ديكور */}
          <Box sx={{ width: 430, display: "flex", flexDirection: "column", gap: 1 }}>
            {/* ... نفس كود الصور */}
          </Box>
        </Box>

      {/* رسالة نجاح */}
      <Snackbar
      //عنصر من MUI لعرض رسالة مؤقتة
        open={successOpen}
        //اذا التسجيل صحيح تظهر رسالةالنجاح
        autoHideDuration={3000}
        //تختفي بعد 3 ثواني
        onClose={() => setSuccessOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center"
          //مكان ظهورها (أعلى المنتصف)
         }}
      >
        <Alert onClose={() => setSuccessOpen(false)} 
        severity="success"
        //يعطي خلفية خضراء..نجاح 
        //من مكتبة MUI
         variant="filled"
         //شكل عرض الرسالة
         //"filled" → خلفية ممتلئة باللون
         >
          تم إنشاء الحساب بنجاح
        </Alert>
      </Snackbar>
    </Paper>
  );
}