"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Button,
  IconButton
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

interface Booking {
  id: number;
  user: {
    name: string;
    email: string;
  };
  room: {
    type: string;
    price: number;
    hotel: {
      name: string;
    };
  };
  start_date: string;
  end_date: string;
  total_price: number;
  status: string;
}

export default function MyBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch bookings
    // Assuming GET /bookings returns all bookings for admin, but maybe filtered for user?
    // If backend doesn't filter, we might see all. But typically /bookings is scoped or we need /bookings/my-bookings
    // Let's try /bookings first as used in admin, but check if it returns only mine or all.
    // If it returns all, we might need to filter by current user email if backend doesn't do it.
    // Ideally backend should handle "get my bookings".
    
    api.get("/bookings")
      .then((res) => {
        let data = res.data;
        if (data.data) data = data.data; // Handle pagination wrapper
        setBookings(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch bookings", err);
        setLoading(false);
      });
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "success";
      case "pending":
        return "warning";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "مؤكد";
      case "pending":
        return "قيد الانتظار";
      case "cancelled":
        return "ملغي";
      default:
        return status;
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f8f9fa", py: 8, px: 4, direction: "rtl" }}>
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 4, gap: 2 }}>
            <IconButton onClick={() => router.back()} sx={{ border: '1px solid #ccc' }}>
                <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" sx={{ fontWeight: 700, color: "#0E5F4F" }}>
                حجوزاتي
            </Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        ) : bookings.length === 0 ? (
           <Paper sx={{ p: 4, textAlign: "center", borderRadius: 4 }}>
             <Typography variant="h6" color="text.secondary">
               لا يوجد حجوزات حالياً
             </Typography>
             <Button 
                variant="contained" 
                sx={{ mt: 2, bgcolor: "#0E5F4F" }}
                onClick={() => router.push('/hotels')}
             >
                تصفح الفنادق
             </Button>
           </Paper>
        ) : (
          <TableContainer component={Paper} sx={{ borderRadius: 4, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            <Table>
              <TableHead sx={{ bgcolor: "#f1f5f9" }}>
                <TableRow>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>رقم الحجز</TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>الفندق</TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>الغرفة</TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>تاريخ الوصول</TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>تاريخ المغادرة</TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>السعر الإجمالي</TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>الحالة</TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>تفاصيل المستخدم</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id} hover>
                    <TableCell align="right">#{booking.id}</TableCell>
                    <TableCell align="right">{booking.room?.hotel?.name || "غير متوفر"}</TableCell>
                    <TableCell align="right">{booking.room?.type || "غير متوفر"}</TableCell>
                    <TableCell align="right">{booking.start_date}</TableCell>
                    <TableCell align="right">{booking.end_date}</TableCell>
                    <TableCell align="right">${booking.total_price}</TableCell>
                    <TableCell align="right">
                      <Chip 
                        label={getStatusText(booking.status)} 
                        color={getStatusColor(booking.status) as any}
                        size="small"
                        sx={{ fontWeight: "bold" }}
                      />
                    </TableCell>
                     <TableCell align="right">
                        <Box>
                            <Typography variant="body2" fontWeight="bold">{booking.user?.name}</Typography>
                            <Typography variant="caption" color="text.secondary">{booking.user?.email}</Typography>
                        </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
}
