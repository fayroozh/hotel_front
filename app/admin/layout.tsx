"use client";

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
    // Temporarily disable auth check to allow access
    const [authorized, setAuthorized] = useState(true); 
    const router = useRouter();

    /*
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
            if (email !== "admin@admin.com") {
                router.push("/"); // Redirect non-admins to home
            } else {
                setAuthorized(true);
            }
        } catch (e) {
            router.push("/login");
        }
    }, [router]);
    */

    if (!authorized) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
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
                    marginLeft: "280px", // ← هنا
                }}
            >
                {children}
            </Box>
        </Box>
    );
}
