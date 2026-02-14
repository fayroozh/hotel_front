import { Box, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BusinessIcon from "@mui/icons-material/Business";
import PeopleIcon from "@mui/icons-material/People";
import MessageIcon from "@mui/icons-material/Message";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import RateReviewIcon from "@mui/icons-material/RateReview";
import LogoutIcon from "@mui/icons-material/Logout";

import HotelIcon from "@mui/icons-material/Hotel";

const menuItems = [
    { text: "لوحة التحكم", icon: <DashboardIcon />, path: "/admin" },
    { text: "إدارة الفنادق", icon: <BusinessIcon />, path: "/admin/hotels" },
    
    {
        text: "إدارة الحجوزات",
        icon: <BookOnlineIcon />,
        path: "/admin/bookings",
    },
    { text: "المستخدمين والمحفظة", icon: <PeopleIcon />, path: "/admin/users" },
    { text: "رسائل التواصل", icon: <MessageIcon />, path: "/admin/messages" },
];

export default function AdminSidebar() {
    return (
        <Box
            sx={{
                width: 280,
                backgroundColor: "#fff",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                borderRight: "1px solid #eee", // border بدل borderLeft
                position: "fixed",
                top: 0,
                
                zIndex: 100,
                boxShadow: "4px 0px 20px rgba(0, 0, 0, 0.05)", // ظل من اليمين
            }}
        >
            {/* Logo */}
            <Box
                sx={{
                    p: 4,
                    display: "flex",
                    justifyContent: "center",
                    borderBottom: "1px solid #f0f0f0",
                    mb: 2,
                    backgroundColor: "#fff",
                }}
            >
                <Image
                    src="/logo.svg"
                    alt="Seramila"
                    width={180}
                    height={100}
                    style={{ objectFit: "contain" }}
                    loading="eager"
                />
            </Box>

            {/* Menu Items */}
            <Box sx={{ flex: 1, mt: 4 }}>
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        href={item.path}
                        style={{ textDecoration: "none" }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                p: 2,
                                px: 4,
                                cursor: "pointer",
                                color: "#4D4A4A",
                                "&:hover": {
                                    backgroundColor: "#f5f5f5",
                                    color: "#0E5F4F",
                                },
                            }}
                        >
                            <Box sx={{ ml: 2, color: "inherit" }}>
                                {item.icon}
                            </Box>
                            <Typography
                                sx={{ fontWeight: 600, fontSize: "16px" }}
                            >
                                {item.text}
                            </Typography>
                        </Box>
                    </Link>
                ))}
            </Box>
        </Box>
    );
}
