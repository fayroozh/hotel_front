'use client';

import Box from "@mui/material/Box";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      router.push("/login");
      return;
    }

    try {
      const user = JSON.parse(userStr);
      const userData = user.data || user; // Handle wrapped or unwrapped data
      const email = (userData.email || "").toLowerCase();

      // Check if email is admin@admin.com (Strictly by email as requested)
      if (email !== 'admin@admin.com') {
        router.push("/"); // Redirect non-admins to home
      } else {
        setAuthorized(true);
      }
    } catch (e) {
      router.push("/login");
    }
  }, [router]);

  if (!authorized) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      {/* Sidebar (Right Side) */}
      <AdminSidebar />

      {/* Main Content (Left Side) */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mr: "280px", // Margin Right to account for Sidebar width
          p: 4,
          direction: "rtl",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
