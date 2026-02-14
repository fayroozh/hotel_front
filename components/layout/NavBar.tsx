"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import Link from "next/link";

const navItems = [
  { text: "الرئيسية", path: "/" },
  { text: "المحافظات", path: "#services" },
  { text: "الفنادق المتوفرة", path: "/hotels" },
  { text: "تواصل معنا", path: "#contact" },
];

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const router = useRouter();
  const ADMIN_EMAIL = "admin@admin.com";

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);

      const userDataStr = localStorage.getItem("user");
      if (userDataStr) {
        try {
          const userData = JSON.parse(userDataStr);
          setIsAdmin(!!loggedIn && userData.email?.toLowerCase() === ADMIN_EMAIL);
        } catch {}
      } else if (loggedIn) {
        // إذا ما فيه بيانات في localStorage، نجيب من السيرفر
        api.get("/user").then((res) => {
          const userData = res.data.data || res.data;
          const email = userData.email?.toLowerCase?.();
          if (email) {
            if (email === ADMIN_EMAIL) setIsAdmin(true);
            localStorage.setItem("user", JSON.stringify(userData));
          }
        }).catch(() => {});
      }
    }
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/logout");
    } catch (error) {
      console.error("Logout failed", error);
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setIsAdmin(false);
    router.push("/");
  };

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

  const drawer = (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Image src="/logo.svg" alt="Seramila" width={120} height={60} loading="eager" />
      <List sx={{ mt: 2 }}>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} href={item.path} sx={{ textAlign: "center" }}>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{ sx: { color: "#4D4A4A", fontWeight: 800 } }}
              />
            </ListItemButton>
          </ListItem>
        ))}
        {isLoggedIn && isAdmin && (
          <ListItem disablePadding>
            <ListItemButton component={Link} href="/admin" sx={{ textAlign: "center" }}>
              <ListItemText
                primary="لوحة التحكم"
                primaryTypographyProps={{ sx: { color: "#0E5F4F", fontWeight: 800 } }}
              />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", justifyContent: "center", pt: 5 }}>
      <AppBar
        position="static"
        elevation={3}
        sx={{
          width: "1280px",
          height: "90px",
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          justifyContent: "center",
        }}
      >
        <Toolbar sx={{ minHeight: "98px", px: 4, justifyContent: "space-between" }}>
          <IconButton onClick={handleDrawerToggle} sx={{ display: { sm: "none" }, color: "var(--color-text-primary)" }}>
            <MenuIcon />
          </IconButton>

          <Image src="/logo.svg" alt="Seramila" width={200} height={120} />

          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 4, alignItems: "center" }}>
            {navItems.map((item) => (
              <Button
                key={item.text}
                component={Link}
                href={item.path}
                sx={{ color: "#4D4A4A", fontWeight: 800, fontSize: "16px", "&:hover": { color: "var(--color-primary)" } }}
              >
                {item.text}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 1, alignItems: "center" }}>
            {isLoggedIn && isAdmin && (
              <IconButton
                component={Link}
                href="/admin"
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  backgroundColor: "#F3F4F6",
                  color: "#0E5F4F",
                  border: "1px solid transparent",
                  "&:hover": { backgroundColor: "#E5E7EB", color: "#0b4d40", border: "1px solid #d1d5db" },
                }}
                title="لوحة التحكم"
              >
                <span style={{ fontSize: "20px" }}>⚙️</span>
              </IconButton>
            )}

            {!isLoggedIn ? (
              <>
                <Link href="/signup">
                  <Button sx={{ height: 44, borderRadius: "18px", backgroundColor: "#ECE6E6", color: "#045746", px: 3, "&:hover": { backgroundColor: "rgba(35,93,81,0.1)" } }}>
                    إنشاء حساب
                  </Button>
                </Link>
                <Link href="/login">
                  <Button sx={{ height: 44, borderRadius: "18px", backgroundColor: "#00372C", color: "#fff", px: 3, "&:hover": { backgroundColor: "rgba(35,93,81,0.1)", color: "#045746" } }}>
                    تسجيل الدخول
                  </Button>
                </Link>
              </>
            ) : (
              <Link href="/profile">
                <Box sx={{ width: 40, height: 40, borderRadius: "50%", backgroundColor: "#F3F3F3", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <AccountCircleOutlinedIcon sx={{ color: "#00372C", fontSize: 22 }} />
                </Box>
              </Link>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { width: 240, backgroundColor: "var(--color-bg-default)" },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
