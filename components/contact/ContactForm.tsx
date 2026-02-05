"use client";

import {
  Paper,
  TextField,
  Typography,
  Button,
  Alert,
  Snackbar,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";

export default function ContactForm() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (phone && message) {
      const existingMessages = JSON.parse(
        localStorage.getItem("admin_messages") || "[]"
      );

      const newMessage = {
        id: Date.now(),
        phone,
        message,
        date: new Date().toISOString(),
        read: false,
      };

      localStorage.setItem(
        "admin_messages",
        JSON.stringify([newMessage, ...existingMessages])
      );

      setOpen(true);
      setPhone("");
      setMessage("");
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      className="auth-rtl" // ✅ RTL هنا
      sx={{
        p: 5,
        border: "2px solid #0E5F4F",
        borderRadius: "20px",
        boxShadow: "none",
        width: { xs: "100%", md: 610 },
        minHeight: 430,

        // ✅ كل النصوص يمين تلقائي
        direction: "rtl",
        textAlign: "right",

        // ✅ Typography يمين
        "& .MuiTypography-root": {
          textAlign: "right",
        },

        // ✅ الكتابة داخل TextField يمين
        "& input": {
          textAlign: "right",
          direction: "rtl",
        },

        // ✅ TextArea يمين
        "& textarea": {
          textAlign: "right",
          direction: "rtl",
        },
      }}
    >
      {/* Snackbar */}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="success"
          sx={{
            width: "100%",
            direction: "rtl",
            textAlign: "right",
          }}
        >
          تم إرسال رسالتك بنجاح!
        </Alert>
      </Snackbar>

      {/* العنوان */}
      <Typography sx={{ fontWeight: 700, fontSize: "26px", mb: 1 }}>
        تواصل معنا
      </Typography>

      {/* الوصف */}
      <Typography
        sx={{
          fontSize: "22px",
          color: "#555",
          mb: 4,
          lineHeight: 1.8,
        }}
      >
        نحن هنا لمساعدتك في حجز فندقك بكل سهولة وأمان داخل سوريا
      </Typography>

      {/* رقم التواصل */}
      <Typography sx={{ fontSize: "20px", fontWeight: 600, mb: 1 }}>
        رقمك للتواصل
      </Typography>

      <TextField
        fullWidth
        required
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        inputProps={{ dir: "rtl" }} // ✅ مهم
        sx={{
          mb: 3,
          "& .MuiOutlinedInput-root": {
            borderRadius: "6px",
            height: "44px",
          },
        }}
      />

      {/* الاستفسار */}
      <Typography sx={{ fontSize: "20px", fontWeight: 600, mb: 1 }}>
        الاستفسار
      </Typography>

      <TextField
        fullWidth
        required
        multiline
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        inputProps={{ dir: "rtl" }} // ✅ مهم
        sx={{
          mb: 4,
          "& .MuiOutlinedInput-root": {
            borderRadius: "6px",
          },
        }}
      />

      {/* زر الإرسال */}
      <Button
        fullWidth
        type="submit"
        variant="contained"
        
        sx={{
          backgroundColor: "#0E5F4F",
          color: "#fff",
          fontSize: "20px",
          fontWeight: 700,
          py: 1.5,
          borderRadius: "8px",
          "&:hover": {
            backgroundColor: "#0b4d40",
          },
        }}
      >
        {<SendIcon sx={{ ml: 1, transform: "rotate(180deg)" }} />}
        إرسال
      </Button>
    </Paper>
  );
}
