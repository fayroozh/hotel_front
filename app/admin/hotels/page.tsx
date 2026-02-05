"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "@/lib/api";

interface Hotel {
  id: number;
  name: string;
  location: string;
  stars: number;
  description: string;
  status: string;
}

export default function HotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentHotel, setCurrentHotel] = useState<Partial<Hotel>>({});
  const [isEdit, setIsEdit] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" });

  const fetchHotels = () => {
    setLoading(true);
    api.get("/hotels")
      .then((res) => {
        setHotels(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch hotels", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleOpenDialog = (hotel?: Hotel) => {
    if (hotel) {
      setCurrentHotel(hotel);
      setIsEdit(true);
    } else {
      setCurrentHotel({
        name: "",
        location: "",
        stars: 3,
        description: "",
      });
      setIsEdit(false);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentHotel({});
  };

  const handleSave = () => {
    if (isEdit && currentHotel.id) {
      // Update
      api.put(`/hotels/${currentHotel.id}`, currentHotel)
        .then(() => {
          setSnackbar({ open: true, message: "تم تحديث الفندق بنجاح", severity: "success" });
          fetchHotels();
          handleCloseDialog();
        })
        .catch((err) => {
            console.error(err);
          setSnackbar({ open: true, message: "حدث خطأ أثناء التحديث", severity: "error" });
        });
    } else {
      // Create
      api.post("/hotels", currentHotel)
        .then(() => {
          setSnackbar({ open: true, message: "تم إضافة الفندق بنجاح", severity: "success" });
          fetchHotels();
          handleCloseDialog();
        })
        .catch((err) => {
            console.error(err);
          setSnackbar({ open: true, message: "حدث خطأ أثناء الإضافة", severity: "error" });
        });
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("هل أنت متأكد من حذف هذا الفندق؟")) {
      api.delete(`/hotels/${id}`)
        .then(() => {
          setSnackbar({ open: true, message: "تم الحذف بنجاح", severity: "success" });
          fetchHotels();
        })
        .catch((err) => {
            console.error(err);
          setSnackbar({ open: true, message: "حدث خطأ أثناء الحذف", severity: "error" });
        });
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: "#0E5F4F" }}>
          إدارة الفنادق
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{
            backgroundColor: "#0E5F4F",
            "&:hover": { backgroundColor: "#084438" },
          }}
        >
          إضافة فندق
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell align="right" sx={{ fontWeight: 700 }}>الاسم</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>الموقع</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>النجوم</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>الحالة</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>الإجراءات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hotels.map((hotel) => (
                <TableRow key={hotel.id}>
                  <TableCell align="right">{hotel.name}</TableCell>
                  <TableCell align="right">{hotel.location}</TableCell>
                  <TableCell align="right">{hotel.stars} نجوم</TableCell>
                  <TableCell align="right">
                    <Box
                      sx={{
                        display: "inline-block",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: "8px",
                        fontSize: "12px",
                        fontWeight: 600,
                        backgroundColor: hotel.status === "approved" ? "#E8F5E9" : "#FFF3E0",
                        color: hotel.status === "approved" ? "#2E7D32" : "#EF6C00",
                      }}
                    >
                      {hotel.status === "approved" ? "نشط" : "قيد الانتظار"}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" onClick={() => handleOpenDialog(hotel)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(hotel.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {hotels.length === 0 && (
                <TableRow>
                    <TableCell colSpan={5} align="center">لا يوجد فنادق حالياً</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Dialog for Add/Edit */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ textAlign: "right" }}>
          {isEdit ? "تعديل الفندق" : "إضافة فندق جديد"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              label="اسم الفندق"
              fullWidth
              value={currentHotel.name || ""}
              onChange={(e) => setCurrentHotel({ ...currentHotel, name: e.target.value })}
              dir="rtl"
            />
            <TextField
              label="الموقع"
              fullWidth
              value={currentHotel.location || ""}
              onChange={(e) => setCurrentHotel({ ...currentHotel, location: e.target.value })}
              dir="rtl"
            />
            <TextField
              select
              label="عدد النجوم"
              fullWidth
              value={currentHotel.stars || 3}
              onChange={(e) => setCurrentHotel({ ...currentHotel, stars: Number(e.target.value) })}
              dir="rtl"
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <MenuItem key={star} value={star}>
                  {star} نجوم
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="الوصف"
              fullWidth
              multiline
              rows={3}
              value={currentHotel.description || ""}
              onChange={(e) => setCurrentHotel({ ...currentHotel, description: e.target.value })}
              dir="rtl"
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "flex-start", p: 2 }}>
          <Button onClick={handleCloseDialog} color="inherit">
            إلغاء
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            حفظ
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
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
