"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
  Chip,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import api from "@/lib/api";


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

function normalizeArrayResponse<T>(data: any): T[] {
  if (Array.isArray(data)) return data;
  if (data?.data && Array.isArray(data.data)) return data.data;
  return [];
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" });

  const fetchBookings = () => {
    setLoading(true);
    api.get("/bookings")
      .then((res) => {
        setBookings(normalizeArrayResponse(res.data));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch bookings", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, id: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedBookingId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedBookingId(null);
  };

  const handleStatusChange = (status: string) => {
    if (!selectedBookingId) return;

    api.put(`/bookings/${selectedBookingId}`, { status })
      .then(() => {
        setSnackbar({ open: true, message: "تم تحديث حالة الحجز", severity: "success" });
        fetchBookings();
        handleMenuClose();
      })
      .catch((err) => {
        console.error(err);
        setSnackbar({ open: true, message: "فشل تحديث الحالة", severity: "error" });
        handleMenuClose();
      });
  };

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

  const getStatusLabel = (status: string) => {
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
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, color: "#0E5F4F" }}>
        إدارة الحجوزات
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell align="right" sx={{ fontWeight: 700 }}>رقم الحجز</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>المستخدم</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>الفندق</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>الغرفة</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>تاريخ الوصول</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>تاريخ المغادرة</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>الإجمالي</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>الحالة</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>الإجراءات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell align="right">#{booking.id}</TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={600}>{booking.user.name}</Typography>
                    <Typography variant="caption" color="textSecondary">{booking.user.email}</Typography>
                  </TableCell>
                  <TableCell align="right">{booking.room.hotel.name}</TableCell>
                  <TableCell align="right">{booking.room.type}</TableCell>
                  <TableCell align="right">{booking.start_date}</TableCell>
                  <TableCell align="right">{booking.end_date}</TableCell>
                  <TableCell align="right">{booking.total_price} ل.س</TableCell>
                  <TableCell align="right">
                    <Chip
                      label={getStatusLabel(booking.status)}
                      color={getStatusColor(booking.status) as any}
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={(e) => handleMenuClick(e, booking.id)}>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
               {bookings.length === 0 && (
                <TableRow>
                    <TableCell colSpan={9} align="center">لا يوجد حجوزات حالياً</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleStatusChange("confirmed")}>تأكيد الحجز</MenuItem>
        <MenuItem onClick={() => handleStatusChange("pending")}>تعليق الحجز</MenuItem>
        <MenuItem onClick={() => handleStatusChange("cancelled")} sx={{ color: "error.main" }}>إلغاء الحجز</MenuItem>
      </Menu>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
