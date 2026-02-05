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
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import AddCardIcon from "@mui/icons-material/AddCard";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "@/lib/api";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  wallet_balance: number;
  role: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [openCreditDialog, setOpenCreditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [creditAmount, setCreditAmount] = useState<number>(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" });

  const fetchUsers = () => {
    setLoading(true);
    // Since we cannot change the backend to add /users endpoint, 
    // we fetch bookings and extract unique users from them.
    api.get("/bookings")
      .then((res) => {
        const bookings: any[] = res.data;
        const uniqueUsersMap = new Map<number, User>();

        bookings.forEach((booking) => {
          if (booking.user) {
            // Check if user already exists in map, if not add it
            // Note: user object from booking might not have all fields like phone or wallet_balance
            // We'll use what we have. For wallet balance, we might not get it here unfortunately
            // unless we have another way. But for now, this is the workaround.
            if (!uniqueUsersMap.has(booking.user.id)) {
                // If the user object in booking doesn't have wallet_balance, we default to 0 or 'N/A'
                // Actually, Booking::with('user') usually returns the full user model unless hidden.
                uniqueUsersMap.set(booking.user.id, {
                    ...booking.user,
                    role: booking.user.role || 'user',
                    wallet_balance: booking.user.wallet_balance || 0
                });
            }
          }
        });

        setUsers(Array.from(uniqueUsersMap.values()));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch bookings for users", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenCreditDialog = (user: User) => {
    setSelectedUser(user);
    setCreditAmount(0);
    setOpenCreditDialog(true);
  };

  const handleCloseCreditDialog = () => {
    setOpenCreditDialog(false);
    setSelectedUser(null);
  };

  const handleCreditWallet = () => {
    if (!selectedUser || creditAmount <= 0) return;

    api.post(`/wallet/credit/${selectedUser.id}`, { amount: creditAmount })
      .then(() => {
        setSnackbar({ open: true, message: "تم شحن المحفظة بنجاح", severity: "success" });
        // We can't easily refresh just the user list because we rely on bookings
        // So we just update the local state or fetch bookings again
        fetchUsers(); 
        handleCloseCreditDialog();
      })
      .catch((err) => {
        console.error(err);
        setSnackbar({ open: true, message: "فشل شحن المحفظة", severity: "error" });
      });
  };

  const handleDelete = (id: number) => {
     // Deleting user is not possible without backend endpoint /users/{id}
     // We should disable this feature or show alert
     alert("عذراً، لا يمكن حذف المستخدمين دون تعديل الباك إند.");
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, color: "#0E5F4F" }}>
        إدارة المستخدمين والمحفظة
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>الاسم</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>البريد الإلكتروني</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>الهاتف</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>الرصيد</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>الدور</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>إجراءات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#388E3C" }}>{user.wallet_balance} ل.س</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="success"
                      startIcon={<AddCardIcon />}
                      onClick={() => handleOpenCreditDialog(user)}
                      size="small"
                      sx={{ mr: 1 }}
                    >
                      شحن
                    </Button>
                    <IconButton color="error" onClick={() => handleDelete(user.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={openCreditDialog} onClose={handleCloseCreditDialog}>
        <DialogTitle>شحن محفظة: {selectedUser?.name}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 1 }}>
            <TextField
              label="المبلغ (ل.س)"
              type="number"
              fullWidth
              value={creditAmount}
              onChange={(e) => setCreditAmount(Number(e.target.value))}
              autoFocus
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreditDialog}>إلغاء</Button>
          <Button onClick={handleCreditWallet} variant="contained" color="success">
            تأكيد الشحن
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
