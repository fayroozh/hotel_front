
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

function normalizeArrayResponse<T>(root: any): T[] {
  if (Array.isArray(root)) return root;
  const candidates = [
    root?.data,
    root?.hotels,
    root?.data?.hotels,
  ];
  for (const c of candidates) {
    if (Array.isArray(c)) return c;
  }
  return [];
}

export default function HotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentHotel, setCurrentHotel] = useState<Partial<Hotel>>({});
  const [isEdit, setIsEdit] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });


 const fetchHotels = () => {
  setLoading(true);

  api.get("/hotels")
    .then((res) => {
      setHotels(normalizeArrayResponse<Hotel>(res.data));
      setLoading(false);
    })
    .catch((err) => {
      console.error("Fetch hotels failed:", err);
      setHotels([]);
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
    setImageFile(null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentHotel({});
    setImageFile(null);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      if (currentHotel.name) formData.append('name', String(currentHotel.name));
      if (currentHotel.location) formData.append('location', String(currentHotel.location));
      if (currentHotel.stars !== undefined) formData.append('stars', String(currentHotel.stars));
      if (currentHotel.description) formData.append('description', String(currentHotel.description));
      if (imageFile) formData.append('image', imageFile);

      const hasToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (!hasToken) {
        try { await api.get('/sanctum/csrf-cookie'); } catch {}
      }

      const req = isEdit && currentHotel.id
        ? api.put(`/hotels/${currentHotel.id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        : api.post("/hotels", formData, { headers: { 'Content-Type': 'multipart/form-data' } });

      const res = await req;
      const hotel = res.data?.data || res.data;
      if (!hotel || !hotel.id) {
        setSnackbar({ open: true, message: "تعذر التأكد من حفظ الفندق على الخادم", severity: "error" });
        return;
      }

      setSnackbar({
        open: true,
        message: isEdit ? "تم تحديث الفندق بنجاح" : "تم إضافة الفندق بنجاح",
        severity: "success",
      });

      setOpenDialog(false);
      setImageFile(null);
      setCurrentHotel({});

      fetchHotels();
    } catch {
      setSnackbar({
        open: true,
        message: isEdit ? "حدث خطأ أثناء التحديث" : "حدث خطأ أثناء الإضافة",
        severity: "error",
      });
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("هل أنت متأكد من حذف هذا الفندق؟")) {
      api
        .delete(`/hotels/${id}`)
        .then(() => {
          setSnackbar({
            open: true,
            message: "تم الحذف بنجاح",
            severity: "success",
          });
          fetchHotels();
        })
        .catch(() => {
          setSnackbar({
            open: true,
            message: "حدث خطأ أثناء الحذف",
            severity: "error",
          });
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
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          }}
        >
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell align="right" sx={{ fontWeight: 700 }}>
                  الاسم
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>
                  الموقع
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>
                  النجوم
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>
                  الحالة
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  الإجراءات
                </TableCell>
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
                        backgroundColor:
                          hotel.status === "approved"
                            ? "#E8F5E9"
                            : "#FFF3E0",
                        color:
                          hotel.status === "approved"
                            ? "#2E7D32"
                            : "#EF6C00",
                      }}
                    >
                      {hotel.status === "approved"
                        ? "نشط"
                        : "قيد الانتظار"}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDialog(hotel)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(hotel.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

              {hotels.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    لا يوجد فنادق حالياً
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Dialog */}
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
              onChange={(e) =>
                setCurrentHotel({ ...currentHotel, name: e.target.value })
              }
              dir="rtl"
            />
            <TextField
              label="الموقع"
              fullWidth
              value={currentHotel.location || ""}
              onChange={(e) =>
                setCurrentHotel({ ...currentHotel, location: e.target.value })
              }
              dir="rtl"
            />
            <TextField
              select
              label="عدد النجوم"
              fullWidth
              value={currentHotel.stars || 3}
              onChange={(e) =>
                setCurrentHotel({
                  ...currentHotel,
                  stars: Number(e.target.value),
                })
              }
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
              onChange={(e) =>
                setCurrentHotel({
                  ...currentHotel,
                  description: e.target.value,
                })
              }
              dir="rtl"
            />
          <Box>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setCurrentHotel({ ...currentHotel, image: file.name } as any);
                  setImageFile(file);
                }
              }}
            />
          </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "flex-start", p: 2 }}>
          <Button onClick={handleCloseDialog} color="inherit">
            إلغاء
          </Button>
          <Button onClick={handleSave} variant="contained">
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
