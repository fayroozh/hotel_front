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
}

interface Room {
  id: number;
  hotel_id: number;
  hotel: {
    name: string;
  };
  type: string;
  price: number;
  capacity: number;
  description: string;
  is_available: boolean;
}

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<Partial<Room>>({});
  const [isEdit, setIsEdit] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" });

  const fetchRooms = () => {
    setLoading(true);
    api.get("/rooms")
      .then((res) => {
        setRooms(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch rooms", err);
        setLoading(false);
      });
  };

  const fetchHotels = () => {
    api.get("/hotels").then((res) => setHotels(res.data));
  };

  useEffect(() => {
    fetchRooms();
    fetchHotels();
  }, []);

  const handleOpenDialog = (room?: Room) => {
    if (room) {
      setCurrentRoom(room);
      setIsEdit(true);
    } else {
      setCurrentRoom({
        hotel_id: hotels.length > 0 ? hotels[0].id : 0,
        type: "Standard",
        price: 0,
        capacity: 2,
        description: "",
        is_available: true,
      });
      setIsEdit(false);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentRoom({});
  };

  const handleSave = () => {
    if (isEdit && currentRoom.id) {
      api.put(`/rooms/${currentRoom.id}`, currentRoom)
        .then(() => {
          setSnackbar({ open: true, message: "تم تحديث الغرفة بنجاح", severity: "success" });
          fetchRooms();
          handleCloseDialog();
        })
        .catch((err) => {
          setSnackbar({ open: true, message: "حدث خطأ أثناء التحديث", severity: "error" });
        });
    } else {
      api.post("/rooms", currentRoom)
        .then(() => {
          setSnackbar({ open: true, message: "تمت إضافة الغرفة بنجاح", severity: "success" });
          fetchRooms();
          handleCloseDialog();
        })
        .catch((err) => {
          setSnackbar({ open: true, message: "حدث خطأ أثناء الإضافة", severity: "error" });
        });
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("هل أنت متأكد من حذف هذه الغرفة؟")) {
      api.delete(`/rooms/${id}`)
        .then(() => {
          setSnackbar({ open: true, message: "تم حذف الغرفة", severity: "success" });
          fetchRooms();
        })
        .catch((err) => {
          setSnackbar({ open: true, message: "حدث خطأ أثناء الحذف", severity: "error" });
        });
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: "#0E5F4F" }}>
          إدارة الغرف
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{ backgroundColor: "#0E5F4F", borderRadius: "10px" }}
        >
          إضافة غرفة
        </Button>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>الفندق</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>النوع</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>السعر</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>السعة</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>الحالة</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>إجراءات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rooms.map((room) => (
                <TableRow key={room.id} hover>
                  <TableCell>{room.hotel?.name}</TableCell>
                  <TableCell>{room.type}</TableCell>
                  <TableCell>{room.price} ل.س</TableCell>
                  <TableCell>{room.capacity} أشخاص</TableCell>
                  <TableCell>{room.is_available ? "متاحة" : "غير متاحة"}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleOpenDialog(room)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(room.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{isEdit ? "تعديل غرفة" : "إضافة غرفة جديدة"}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              select
              label="الفندق"
              value={currentRoom.hotel_id || ""}
              onChange={(e) => setCurrentRoom({ ...currentRoom, hotel_id: Number(e.target.value) })}
              fullWidth
            >
              {hotels.map((hotel) => (
                <MenuItem key={hotel.id} value={hotel.id}>
                  {hotel.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="نوع الغرفة"
              value={currentRoom.type || ""}
              onChange={(e) => setCurrentRoom({ ...currentRoom, type: e.target.value })}
              fullWidth
            />
            <TextField
              label="السعر"
              type="number"
              value={currentRoom.price || ""}
              onChange={(e) => setCurrentRoom({ ...currentRoom, price: Number(e.target.value) })}
              fullWidth
            />
            <TextField
              label="السعة"
              type="number"
              value={currentRoom.capacity || ""}
              onChange={(e) => setCurrentRoom({ ...currentRoom, capacity: Number(e.target.value) })}
              fullWidth
            />
            <TextField
              label="الوصف"
              multiline
              rows={3}
              value={currentRoom.description || ""}
              onChange={(e) => setCurrentRoom({ ...currentRoom, description: e.target.value })}
              fullWidth
            />
            <TextField
              select
              label="الحالة"
              value={currentRoom.is_available ? 1 : 0}
              onChange={(e) => setCurrentRoom({ ...currentRoom, is_available: Boolean(e.target.value) })}
              fullWidth
            >
              <MenuItem value={1}>متاحة</MenuItem>
              <MenuItem value={0}>غير متاحة</MenuItem>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>إلغاء</Button>
          <Button onClick={handleSave} variant="contained" sx={{ backgroundColor: "#0E5F4F" }}>
            حفظ
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}
