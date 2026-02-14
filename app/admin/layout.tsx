"use client";

import Box from "@mui/material/Box";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

const ADMIN_EMAIL = "admin@admin.com";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const authorizedRef = useRef(false);

  useEffect(() => {
    const localStr = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    const loggedIn = typeof window !== "undefined" ? localStorage.getItem("isLoggedIn") === "true" : false;
    if (localStr) {
      try {
        const localUser = JSON.parse(localStr);
        const localEmail = (localUser?.email || localUser?.data?.email || "").toLowerCase();
        if (loggedIn && localEmail === ADMIN_EMAIL) {
          setAuthorized(true);
          authorizedRef.current = true;
        }
      } catch {}
    }

    api.get("/user", { withCredentials: true })
      .then((res) => {
        const data = res.data?.data || res.data;
        const email = (data?.email || "").toLowerCase();
        if (email === ADMIN_EMAIL) {
          setAuthorized(true);
          authorizedRef.current = true;
        } else {
          if (!authorizedRef.current) {
            router.push("/");
          }
        }
      })
      .catch(() => {
        if (!localStr || !loggedIn) {
          router.push("/login");
        }
      });
  }, [router]);

  if (!authorized) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      <AdminSidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          direction: "ltr",
          marginLeft: "280px",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
