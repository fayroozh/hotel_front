"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import {
  Box,
  Paper,
  Typography,
  Button,
  FormControl,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";

// ✅ DatePicker imports
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

const inputRtlSx = {
  "& input": {
    direction: "rtl !important",
    textAlign: "right !important",
    unicodeBidi: "plaintext",
    fontSize: "20px",
  },
};

type FormState = {
  hotelName: string; // ✅ NEW
  fullName: string;
  phone: string;
  roomType: string;
  roomsCount: string;
  arrivalTime: string;
  departureTime: string;
  peopleCount: string;
  bookingDate: Dayjs | null; // ✅ Dayjs
  daysCount: string;
};

const initialState: FormState = {
  hotelName: "", // ✅ NEW
  fullName: "",
  phone: "",
  roomType: "",
  roomsCount: "",
  arrivalTime: "",
  departureTime: "",
  peopleCount: "",
  bookingDate: null,
  daysCount: "",
};

function isValidTimeHHMM(value: string) {
  const m = value.match(/^([01]\d|2[0-3]):([0-5]\d)$/);
  return !!m;
}

function isPositiveInt(value: string) {
  if (!/^\d+$/.test(value)) return false;
  const n = Number(value);
  return Number.isInteger(n) && n > 0;
}

function validate(values: FormState) {
  const errors: Partial<Record<keyof FormState, string>> = {};


  if (values.fullName.trim().length < 3) {
    errors.fullName = "الاسم يجب أن يكون 3 أحرف على الأقل";
  }

  const phone = values.phone.trim();
  if (!/^\d{10,15}$/.test(phone)) {
    errors.phone = "أدخل رقم موبايل صحيح (10 إلى 15 رقم)";
  }

  if (values.roomType.trim().length < 2) {
    errors.roomType = "أدخل نوع الغرفة";
  }

  if (!isPositiveInt(values.roomsCount)) {
    errors.roomsCount = "أدخل عدد غرف صحيح";
  }

  if (!isValidTimeHHMM(values.arrivalTime.trim())) {
    errors.arrivalTime = "أدخل وقت وصول بصيغة HH:MM";
  }

  if (!isValidTimeHHMM(values.departureTime.trim())) {
    errors.departureTime = "أدخل وقت مغادرة بصيغة HH:MM";
  }

  if (!isPositiveInt(values.peopleCount)) {
    errors.peopleCount = "أدخل عدد أشخاص صحيح";
  }

  if (!values.bookingDate) {
    errors.bookingDate = "اختر تاريخ الحجز";
  }

  if (!isPositiveInt(values.daysCount)) {
    errors.daysCount = "أدخل عدد أيام صحيح";
  }

  // وقت المغادرة بعد الوصول
  if (
    isValidTimeHHMM(values.arrivalTime) &&
    isValidTimeHHMM(values.departureTime)
  ) {
    const [ah, am] = values.arrivalTime.split(":").map(Number);
    const [dh, dm] = values.departureTime.split(":").map(Number);
    const arrival = ah * 60 + am;
    const depart = dh * 60 + dm;
    if (depart < arrival) {
      errors.departureTime = "وقت المغادرة يجب أن يكون بعد وقت الوصول";
    }
  }

  return errors;
}

export default function BookingMuiCard() {
  const router = useRouter();

  const [values, setValues] = React.useState<FormState>(initialState);
  const [touched, setTouched] = React.useState<
    Partial<Record<keyof FormState, boolean>>
  >({});
  const [isBooked, setIsBooked] = React.useState(false);

  const resetTimerRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    return () => {
      if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current);
    };
  }, []);

  const errors = React.useMemo(() => validate(values), [values]);
  const isFormValid = React.useMemo(
    () => Object.keys(errors).length === 0,
    [errors]
  );

  const handleChange =
    (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isBooked) return;
      setValues((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleBlur = (key: keyof FormState) => () => {
    setTouched((prev) => ({ ...prev, [key]: true }));
  };

  const showError = (key: keyof FormState) => !!touched[key] && !!errors[key];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({
      hotelName: true, // ✅ NEW
      fullName: true,
      phone: true,
      roomType: true,
      roomsCount: true,
      arrivalTime: true,
      departureTime: true,
      peopleCount: true,
      bookingDate: true,
      daysCount: true,
    });

    if (!isFormValid) return;

    setIsBooked(true);

    if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current);

    resetTimerRef.current = window.setTimeout(() => {
      setIsBooked(false);
      setValues(initialState);
      setTouched({});
    }, 4000);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 2, md: 4 },
        backgroundColor: "#f7f7f7",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100",
          maxWidth: 1200,
          overflow: "hidden",
          borderRadius: 3,
          border: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          backgroundColor: "#fff",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            minHeight: { xs: "auto", md: 620 },
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
              direction: "rtl",
              textAlign: "right",
              "& .MuiTypography-root": { textAlign: "right" },
              "& .MuiFormHelperText-root": { textAlign: "right" },
            }}
          >
            <Box sx={{ width: "100%", maxWidth: 520 }}>
              <Typography sx={{ fontSize: 32, fontWeight: 700 }}>
                احجز الآن
              </Typography>

              <Typography
                sx={{
                  mt: 1.2,
                  color: "text.secondary",
                  lineHeight: 1.9,
                  fontSize: 22,
                }}
              >
                احجز إقامتك الآن بكل سهولة واستمتع بأفضل الفنادق مع أسعار تناسبك
                وخدمة تضمن راحتك من لحظة الوصول وحتى المغادرة
              </Typography>

              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ mt: 4, display: "grid", gap: 2, textAlign: "right" }}
              >
                {/* الاسم */}
                <Typography sx={{ fontSize: 22, fontWeight: 600 }}>
                  الاسم الكامل
                </Typography>
                <FormControl fullWidth error={showError("fullName")}>
                  <OutlinedInput
                    value={values.fullName}
                    onChange={handleChange("fullName")}
                    onBlur={handleBlur("fullName")}
                    inputProps={{ dir: "rtl" }}
                    sx={inputRtlSx}
                    disabled={isBooked}
                  />
                  {showError("fullName") && (
                    <FormHelperText>{errors.fullName}</FormHelperText>
                  )}
                </FormControl>

                {/* الموبايل */}
                <Typography sx={{ fontSize: 22, fontWeight: 600 }}>
                  رقم الموبايل
                </Typography>
                <FormControl fullWidth error={showError("phone")}>
                  <OutlinedInput
                    value={values.phone}
                    onChange={handleChange("phone")}
                    onBlur={handleBlur("phone")}
                    inputProps={{ dir: "rtl" }}
                    sx={inputRtlSx}
                    disabled={isBooked}
                  />
                  {showError("phone") && (
                    <FormHelperText>{errors.phone}</FormHelperText>
                  )}
                </FormControl>

                {/* نوع الغرف + عدد الغرف */}
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                    gap: 2,
                  }}
                >
                  <Box>
                    <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
                      نوع الغرف
                    </Typography>
                    <FormControl fullWidth error={showError("roomType")}>
                      <OutlinedInput
                        value={values.roomType}
                        onChange={handleChange("roomType")}
                        onBlur={handleBlur("roomType")}
                        inputProps={{ dir: "rtl" }}
                        sx={inputRtlSx}
                        disabled={isBooked}
                      />
                      {showError("roomType") && (
                        <FormHelperText>{errors.roomType}</FormHelperText>
                      )}
                    </FormControl>
                  </Box>

                  <Box>
                    <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
                      عدد الغرف
                    </Typography>
                    <FormControl fullWidth error={showError("roomsCount")}>
                      <OutlinedInput
                        value={values.roomsCount}
                        onChange={handleChange("roomsCount")}
                        onBlur={handleBlur("roomsCount")}
                        inputProps={{ dir: "rtl", inputMode: "numeric" }}
                        sx={inputRtlSx}
                        disabled={isBooked}
                      />
                      {showError("roomsCount") && (
                        <FormHelperText>{errors.roomsCount}</FormHelperText>
                      )}
                    </FormControl>
                  </Box>
                </Box>

                {/* وقت الوصول + وقت المغادرة */}
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                    gap: 2,
                  }}
                >
                  <Box>
                    <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
                      وقت الوصول
                    </Typography>
                    <FormControl fullWidth error={showError("arrivalTime")}>
                      <OutlinedInput
                        placeholder="مثال: 14:30"
                        value={values.arrivalTime}
                        onChange={handleChange("arrivalTime")}
                        onBlur={handleBlur("arrivalTime")}
                        inputProps={{ dir: "rtl" }}
                        sx={inputRtlSx}
                        disabled={isBooked}
                      />
                      {showError("arrivalTime") && (
                        <FormHelperText>{errors.arrivalTime}</FormHelperText>
                      )}
                    </FormControl>
                  </Box>

                  <Box>
                    <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
                      وقت المغادرة
                    </Typography>
                    <FormControl fullWidth error={showError("departureTime")}>
                      <OutlinedInput
                        placeholder="مثال: 18:00"
                        value={values.departureTime}
                        onChange={handleChange("departureTime")}
                        onBlur={handleBlur("departureTime")}
                        inputProps={{ dir: "rtl" }}
                        sx={inputRtlSx}
                        disabled={isBooked}
                      />
                      {showError("departureTime") && (
                        <FormHelperText>{errors.departureTime}</FormHelperText>
                      )}
                    </FormControl>
                  </Box>
                </Box>

                {/* عدد الأشخاص + التاريخ + عدد الأيام */}
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
                    gap: 2,
                  }}
                >
                  {/* عدد الأشخاص */}
                  <Box>
                    <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
                      عدد الأشخاص
                    </Typography>
                    <FormControl fullWidth error={showError("peopleCount")}>
                      <OutlinedInput
                        value={values.peopleCount}
                        onChange={handleChange("peopleCount")}
                        onBlur={handleBlur("peopleCount")}
                        inputProps={{ dir: "rtl", inputMode: "numeric" }}
                        sx={inputRtlSx}
                        disabled={isBooked}
                      />
                      {showError("peopleCount") && (
                        <FormHelperText>{errors.peopleCount}</FormHelperText>
                      )}
                    </FormControl>
                  </Box>

                  {/* DatePicker */}
                  <Box>
                    <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
                      تاريخ الحجز
                    </Typography>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={values.bookingDate}
                        onChange={(newValue) => {
                          if (isBooked) return;
                          setValues((prev) => ({
                            ...prev,
                            bookingDate: newValue,
                          }));
                        }}
                        minDate={dayjs()}
                        disabled={isBooked}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: showError("bookingDate"),
                            onBlur: handleBlur("bookingDate"),
                            placeholder: "",
                            sx: {
                              "& input": {
                                textAlign: "right",
                                fontSize: "18px",
                              },
                            },
                          },
                        }}
                      />
                    </LocalizationProvider>

                    {showError("bookingDate") && (
                      <FormHelperText error>{errors.bookingDate}</FormHelperText>
                    )}
                  </Box>

                  {/* عدد الأيام */}
                  <Box>
                    <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
                      عدد الأيام
                    </Typography>
                    <FormControl fullWidth error={showError("daysCount")}>
                      <OutlinedInput
                        value={values.daysCount}
                        onChange={handleChange("daysCount")}
                        onBlur={handleBlur("daysCount")}
                        inputProps={{ dir: "rtl", inputMode: "numeric" }}
                        sx={inputRtlSx}
                        disabled={isBooked}
                      />
                      {showError("daysCount") && (
                        <FormHelperText>{errors.daysCount}</FormHelperText>
                      )}
                    </FormControl>
                  </Box>
                </Box>

                <Typography sx={{ mt: 1, fontSize: 20, color: "text.secondary" }}>
                  الدفع كاش عند استلام الغرف علماً أنك تفقد الحجز في حال التأخر عن
                  الوصول في الوقت المحدد
                </Typography>

                {/* الأزرار */}
                <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      flex: 1,
                      borderRadius: 2,
                      py: 1.1,
                      fontWeight: 700,
                      fontSize: 20,
                      backgroundColor: isBooked ? "#9E9E9E" : "#0F3D2E",
                      "&:hover": {
                        backgroundColor: isBooked ? "#9E9E9E" : "#0b2e22",
                      },
                    }}
                    disabled={isBooked}
                  >
                    {isBooked ? "تم الحجز" : "احجز الآن"}
                  </Button>

                  <Button
                    variant="contained"
                    sx={{
                      flex: 1,
                      borderRadius: 2,
                      py: 1.1,
                      fontWeight: 700,
                      fontSize: 20,
                      backgroundColor: isBooked ? "#9E9E9E" : "#0F3D2E",
                      "&:hover": {
                        backgroundColor: isBooked ? "#9E9E9E" : "#0b2e22",
                      },
                    }}
                    disabled={isBooked}
                    onClick={() => router.push("/")}
                  >
                    عودة
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* يسار: الصور */}
          <Box sx={{ p: { xs: 3, md: 5 }, display: "flex", justifyContent: "center" }}>
            <Box sx={{ width: 430, display: "flex", flexDirection: "column", gap: 1 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
                <Box
                  sx={{
                    width: 180,
                    height: 470,
                    borderRadius: 1,
                    border: "0.5px solid #0F3D2E",
                    backgroundClip: "padding-box",
                    backgroundOrigin: "border-box",
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
                    backgroundClip: "padding-box",
                    backgroundOrigin: "border-box",
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
                    backgroundClip: "padding-box",
                    backgroundOrigin: "border-box",
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
                    backgroundClip: "padding-box",
                    backgroundOrigin: "border-box",
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
      </Paper>
    </Box>
  );
}