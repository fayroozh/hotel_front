"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";


import Link from "next/link";

const navItems = [
  { text: "الرئيسية", path: "/" },
  { text: "المحافظات", path: "#services" },
  { text: "الفنادق المتوفرة", path: "/hotels" },
  { text: "تواصل معنا", path: "#contact" },
];

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const drawer = (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Image src="/logo.svg" alt="Seramila" width={120} height={60} />

      <List sx={{ mt: 2 }}>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} href={item.path} sx={{ textAlign: "center" }}>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  sx: {
                    color: "#4D4A4A",
                    fontWeight: 800,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
         <ListItem disablePadding>
            <ListItemButton component={Link} href="/admin" sx={{ textAlign: "center" }}>
              <ListItemText
                primary="لوحة التحكم"
                primaryTypographyProps={{
                  sx: {
                    color: "#0E5F4F",
                    fontWeight: 800,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        pt: 5,
      }}
    >
      <AppBar
        position="static"
        elevation={3}
        sx={{
          width: "1280px",            // ✅ مطابق Figma
          height: "90px",             // ✅ مطابق Figma
          backgroundColor: "#ffffff", // ✅ Fill
          borderRadius: "20px",       // ✅ Corner radius
          justifyContent: "center",
        }}
      >
        <Toolbar
          sx={{
            minHeight: "98px",
            px: 4,
            justifyContent: "space-between",
          }}
        >
          {/* Mobile menu */}
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              display: { sm: "none" },
              color: "var(--color-text-primary)",
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Image src="/logo.svg" alt="Seramila" width={200} height={120}  />

          {/* Desktop navigation */}
          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 4, alignItems: 'center' }}>
            {navItems.map((item) => (
              <Button
                key={item.text}
                component={Link}
                href={item.path}
                sx={{
                  color: "#4D4A4A",
                  fontWeight: 800,
                  fontSize: "16px",
                  "&:hover": { color: "var(--color-primary)" },
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>

          {/* Actions */}
         <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 1 }}>

           {/* Admin Dashboard Icon Button */}
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
                "&:hover": { 
                  backgroundColor: "#E5E7EB", 
                  color: "#0b4d40",
                  border: "1px solid #d1d5db"
                },
              }}
              title="لوحة التحكم"
            >
              <span style={{ fontSize: "20px" }}>⚙️</span>
            </IconButton>
        

  {/* إنشاء حساب */}
  {/* <Button
    sx={{
      height: 44,
      borderRadius: "18px",
      backgroundColor: "#ECE6E6",
      color: "#045746",
      px: 3,
      "&:hover": {
        backgroundColor: "rgba(35,93,81,0.1)",
      },
    }}
  >
    إنشاء حساب
  </Button> */}

  {/* تسجيل الدخول */}
  {/* <Button
    sx={{
      height: 44,
      borderRadius: "18px",
      backgroundColor: "#00372C",
      color: "#fff",
      px: 3,
      "&:hover": {
        backgroundColor: "rgba(35,93,81,0.1)",
        color: "#045746",
      },
    }}
  >
    تسجيل الدخول
  </Button> */}

  
      <Box
  sx={{
    display: { xs: "none", sm: "flex" },
    gap: 1.5,
    alignItems: "center",
  }}
>
  {/* Profile icon */}
  <Box
    sx={{
      width: 40,
      height: 40,
      borderRadius: "50%",
      backgroundColor: "#F3F3F3",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
    }}
  >
    <AccountCircleOutlinedIcon sx={{ color: "#00372C", fontSize: 22 }} />
  </Box>
</Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer (mobile) */}
      <Drawer
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            width: 240,
            backgroundColor: "var(--color-bg-default)",
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
