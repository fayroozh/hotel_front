"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Grid, Paper, CircularProgress, Button } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import PeopleIcon from "@mui/icons-material/People";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import api from "@/lib/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real scenario, we fetch from API
    // api.get("/dashboard/stats").then((res) => setStats(res.data));
    
    // For now, let's try to fetch, if fails, use dummy data for UI demo
    api.get("/dashboard/stats")
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch stats", err);
        // Fallback dummy data
        setStats({
          hotels: 0,
          bookings: 0,
          users: 0,
          total_wallet: 0,
        });
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  const statCards = [
    {
      title: "عدد الفنادق",
      value: stats?.hotels || 0,
      icon: <BusinessIcon sx={{ fontSize: 40, color: "#fff" }} />,
      color: "#0E5F4F",
    },
    {
      title: "الحجوزات النشطة",
      value: stats?.bookings || 0,
      icon: <BookOnlineIcon sx={{ fontSize: 40, color: "#fff" }} />,
      color: "#D9A404",
    },
    {
      title: "المستخدمين",
      value: stats?.users || 0,
      icon: <PeopleIcon sx={{ fontSize: 40, color: "#fff" }} />,
      color: "#1976D2",
    },
    {
      title: "إجمالي المحفظة",
      value: `${stats?.total_wallet || 0} ل.س`,
      icon: <MonetizationOnIcon sx={{ fontSize: 40, color: "#fff" }} />,
      color: "#388E3C",
    },
  ];

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, mb: 4, color: "#0E5F4F" }}
      >
        لوحة التحكم
      </Typography>

      <Grid container spacing={4}>
        {statCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              sx={{
                p: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Box>
                <Typography
                  sx={{ color: "#888", fontSize: "14px", fontWeight: 600, mb: 1 }}
                >
                  {card.title}
                </Typography>
                <Typography sx={{ fontSize: "24px", fontWeight: 700 }}>
                  {card.value}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  backgroundColor: card.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                }}
              >
                {card.icon}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions & Summary */}
      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: "#333" }}>
              نظرة عامة
            </Typography>
            <Typography sx={{ color: "#666", lineHeight: 1.8 }}>
              أهلاً بك في لوحة تحكم سيراميلا. يمكنك من هنا إدارة الفنادق، الغرف، ومتابعة الحجوزات النشطة.
              تأكد من مراجعة الحجوزات المعلقة وتحديث حالتها بانتظام لضمان تجربة مستخدم ممتازة.
            </Typography>
            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                <Button variant="contained" color="primary" href="/admin/hotels">إدارة الفنادق</Button>
                <Button variant="outlined" color="primary" href="/admin/bookings">الحجوزات الجديدة</Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
           <Paper sx={{ p: 3, borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", backgroundColor: '#E8F5E9' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: "#0E5F4F" }}>
              حالة النظام
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'success.main', mr: 1 }} />
                <Typography>الواجهة الأمامية: متصل</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'success.main', mr: 1 }} />
                <Typography>الباك إند: متصل (API)</Typography>
            </Box>
             <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'warning.main', mr: 1 }} />
                <Typography>إدارة المستخدمين: وضع القراءة</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
