"use client";

import { useState, useEffect } from "react";
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
  IconButton,
  Tooltip,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface Message {
  id: number;
  phone: string;
  message: string;
  date: string;
  read: boolean;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    // Load messages from localStorage
    const savedMessages = localStorage.getItem("admin_messages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  const handleDelete = (id: number) => {
    if (confirm("هل أنت متأكد من حذف هذه الرسالة؟")) {
      const updatedMessages = messages.filter((msg) => msg.id !== id);
      setMessages(updatedMessages);
      localStorage.setItem("admin_messages", JSON.stringify(updatedMessages));
    }
  };

  const handleView = (message: Message) => {
    setSelectedMessage(message);
    // Mark as read
    const updatedMessages = messages.map((msg) =>
      msg.id === message.id ? { ...msg, read: true } : msg
    );
    setMessages(updatedMessages);
    localStorage.setItem("admin_messages", JSON.stringify(updatedMessages));
  };

  const handleCloseDialog = () => {
    setSelectedMessage(null);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, color: "#0E5F4F" }}>
        رسائل التواصل والملاحظات
      </Typography>

      <Paper sx={{ borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: "#f8f9fa" }}>
              <TableRow>
                <TableCell align="right" sx={{ fontWeight: 700 }}>التاريخ</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>رقم الهاتف</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>الرسالة</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>الحالة</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>إجراءات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {messages.length > 0 ? (
                messages.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell align="right">
                      {new Date(row.date).toLocaleDateString('ar-EG')}
                    </TableCell>
                    <TableCell align="right" sx={{ direction: "ltr", textAlign: "right" }}>
                      {row.phone}
                    </TableCell>
                    <TableCell align="right" sx={{ maxWidth: 300, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {row.message}
                    </TableCell>
                    <TableCell align="center">
                      <Chip 
                        label={row.read ? "مقروءة" : "جديدة"} 
                        color={row.read ? "default" : "primary"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="عرض التفاصيل">
                        <IconButton onClick={() => handleView(row)} color="primary">
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="حذف">
                        <IconButton onClick={() => handleDelete(row.id)} color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                    <Typography color="text.secondary">لا توجد رسائل جديدة</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* View Message Dialog */}
      <Dialog open={!!selectedMessage} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ textAlign: 'right' }}>تفاصيل الرسالة</DialogTitle>
        <DialogContent>
          {selectedMessage && (
            <Box sx={{ pt: 1 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom align="right">
                من: {selectedMessage.phone}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom align="right">
                التاريخ: {new Date(selectedMessage.date).toLocaleString('ar-EG')}
              </Typography>
              <Paper variant="outlined" sx={{ p: 2, mt: 2, backgroundColor: "#f9f9f9" }}>
                <Typography align="right" sx={{ whiteSpace: 'pre-wrap' }}>
                  {selectedMessage.message}
                </Typography>
              </Paper>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'flex-start' }}>
          <Button onClick={handleCloseDialog}>إغلاق</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
