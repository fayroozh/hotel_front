"use client";

import {
  Box,
  Typography,
  Divider,
  IconButton,
  Avatar,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLong";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [bookingsCount, setBookingsCount] = useState<number | null>(null);

  useEffect(() => {
    // 1. Load from LocalStorage (Fastest)
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const parsedUser = JSON.parse(userStr);
        setUser(parsedUser.data || parsedUser);
      } catch (e) {
        console.error("Error parsing user data", e);
      }
    }

    // 2. Fetch User Data + Bookings from API
    api.get('/user').then(res => {
       const userData = res.data.data || res.data;
       setUser(userData);
       localStorage.setItem('user', JSON.stringify(userData));
    }).catch(err => console.error("Failed to fetch user", err));

    // 3. Fetch Bookings Count
    // Assuming there's an endpoint for user bookings, usually /bookings/my-bookings or just /bookings if scoped to user
    // Since admin uses /bookings, we might need to check if /bookings returns only user bookings for non-admin
    api.get('/bookings').then(res => {
        // If it returns an array
        if (Array.isArray(res.data)) {
            setBookingsCount(res.data.length);
        } else if (res.data.data && Array.isArray(res.data.data)) {
             setBookingsCount(res.data.data.length);
        } else {
            setBookingsCount(0);
        }
    }).catch(err => {
        console.error("Failed to fetch bookings", err);
        setBookingsCount(0);
    });

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
    router.push("/");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F7F7F7",
      }}
    >
      {/* الكارد */}
      <Box
        sx={{
          width: 500,
          height: 650,
          backgroundColor: "#fff",
          border: "1px solid #0E5F4F",
          borderRadius: "28px",
          px: 3,
          py: 4,
          position: "relative",
          direction: "rtl",
        }}
      >
        {/* زر الرجوع */}
        <IconButton
          onClick={() => router.back()}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            border: "1px solid #0E5F4F",
            color: "#0E5F4F",
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        {/* الصورة */}
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Avatar
            sx={{
              width: 120,
              height: 120,
              mx: "auto",
              backgroundColor: "#d9d9d9",
            }}
          />
          <Typography
            sx={{
              mt: 2,
              fontSize: "18px",
              fontWeight: 700,
            }}
          >
            {user?.name || "جاري التحميل..."}
          </Typography>
        </Box>

        {/* العناصر */}
        <Box sx={{ mt: 4 }}>
          <ProfileItem 
            icon={<ReceiptLongOutlinedIcon />} 
            label={`حجوزاتي (${bookingsCount !== null ? bookingsCount : "..."})`} 
            onClick={() => router.push('/bookings')} // Redirect to user bookings page if exists
          />
          <ProfileItem
            icon={<EmailOutlinedIcon />}
            label={user?.email || "غير متوفر"}
          />
          <ProfileItem icon={<EditOutlinedIcon />} label="الإعدادات" />
          <ProfileItem 
            icon={<LogoutOutlinedIcon />} 
            label="تسجيل الخروج" 
            onClick={handleLogout}
            isDanger
          />
        </Box>

        {/* اللوجو */}
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Image src="/logo.svg" alt="Seramila" width={270} height={70} />
        </Box>
      </Box>
    </Box>
  );
}

/* عنصر واحد: أيقونة + نص (كله عاليمين) */
function ProfileItem({
  icon,
  label,
  onClick,
  isDanger = false,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  isDanger?: boolean;
}) {
  return (
    <>
      <Box
        onClick={onClick}
        sx={{
          display: "flex",
          flexDirection: "row-reverse", // ✅ الأيقونة أقصى اليمين
          alignItems: "center",
          gap: 2,                      // ✅ مسافة بين الأيقونة والنص
          py: 2,
          cursor: onClick ? "pointer" : "default",
          "&:hover": onClick ? { backgroundColor: "rgba(0,0,0,0.02)" } : {},
        }}
      >
        {/* الأيقونة */}
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: `1px solid ${isDanger ? "#d32f2f" : "#0E5F4F"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: isDanger ? "#d32f2f" : "#0E5F4F",
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>

        {/* النص */}
        <Typography
          sx={{
            fontSize: "15px",
            color: isDanger ? "#d32f2f" : "#333",
            textAlign: "right",
          }}
        >
          {label}
        </Typography>
      </Box>

      <Divider />
    </>
  );
}
// "use client";

// import {
//   Box,
//   Typography,
//   Divider,
//   IconButton,
//   Avatar,
// } from "@mui/material";

// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
// import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
// import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLong";

// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import api from "@/lib/api";

// export default function ProfilePage() {
//   const router = useRouter();
//   const [user, setUser] = useState<any>(null);
//   const [bookingsCount, setBookingsCount] = useState<number | null>(null);

//   useEffect(() => {
//     // 1. Load from LocalStorage (Fastest)
//     const userStr = localStorage.getItem("user");
//     if (userStr) {
//       try {
//         const parsedUser = JSON.parse(userStr);
//         setUser(parsedUser.data || parsedUser);
//       } catch (e) {
//         console.error("Error parsing user data", e);
//       }
//     }

//     // 2. Fetch User Data + Bookings from API
//     api.get('/user').then(res => {
//        const userData = res.data.data || res.data;
//        setUser(userData);
//        localStorage.setItem('user', JSON.stringify(userData));
//     }).catch(err => console.error("Failed to fetch user", err));

//     // 3. Fetch Bookings Count
//     // Assuming there's an endpoint for user bookings, usually /bookings/my-bookings or just /bookings if scoped to user
//     // Since admin uses /bookings, we might need to check if /bookings returns only user bookings for non-admin
//     api.get('/bookings').then(res => {
//         // If it returns an array
//         if (Array.isArray(res.data)) {
//             setBookingsCount(res.data.length);
//         } else if (res.data.data && Array.isArray(res.data.data)) {
//              setBookingsCount(res.data.data.length);
//         } else {
//             setBookingsCount(0);
//         }
//     }).catch(err => {
//         console.error("Failed to fetch bookings", err);
//         setBookingsCount(0);
//     });

//   }, []);

//   const handleLogout = async () => {
//     try {
//       await api.post("/logout");
//     } catch (error) {
//       console.error("Logout failed", error);
//     }
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     localStorage.removeItem("isLoggedIn");
//     router.push("/login");
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#F7F7F7",
//       }}
//     >
//       {/* الكارد */}
//       <Box
//         sx={{
//           width: 500,
//           height: 650,
//           backgroundColor: "#fff",
//           border: "1px solid #0E5F4F",
//           borderRadius: "28px",
//           px: 3,
//           py: 4,
//           position: "relative",
//           direction: "rtl",
//         }}
//       >
//         {/* زر الرجوع */}
//         <IconButton
//           onClick={() => router.back()}
//           sx={{
//             position: "absolute",
//             top: 16,
//             right: 16,
//             border: "1px solid #0E5F4F",
//             color: "#0E5F4F",
//           }}
//         >
//           <ArrowBackIcon />
//         </IconButton>

//         {/* الصورة */}
//         <Box sx={{ textAlign: "center", mt: 3 }}>
//           <Avatar
//             sx={{
//               width: 120,
//               height: 120,
//               mx: "auto",
//               backgroundColor: "#d9d9d9",
//             }}
//           />
//           <Typography
//             sx={{
//               mt: 2,
//               fontSize: "18px",
//               fontWeight: 700,
//             }}
//           >
//             {user?.name || "جاري التحميل..."}
//           </Typography>
//         </Box>

//         {/* العناصر */}
//         <Box sx={{ mt: 4 }}>
//           <ProfileItem 
//             icon={<ReceiptLongOutlinedIcon />} 
//             label={`حجوزاتي (${bookingsCount !== null ? bookingsCount : "..."})`} 
//             onClick={() => router.push('/bookings')} // Redirect to user bookings page if exists
//           />
//           <ProfileItem
//             icon={<EmailOutlinedIcon />}
//             label={user?.email || "غير متوفر"}
//           />
//           <ProfileItem icon={<EditOutlinedIcon />} label="الإعدادات" />
//           <ProfileItem 
//             icon={<LogoutOutlinedIcon />} 
//             label="تسجيل الخروج" 
//             onClick={handleLogout}
//             isDanger
//           />
//         </Box>

//         {/* اللوجو */}
//         <Box sx={{ mt: 4, textAlign: "center" }}>
//           <Image src="/logo.svg" alt="Seramila" width={270} height={70} />
//         </Box>
//       </Box>
//     </Box>
//   );
// }

// /* عنصر واحد: أيقونة + نص (كله عاليمين) */
// function ProfileItem({
//   icon,
//   label,
//   onClick,
//   isDanger = false,
// }: {
//   icon: React.ReactNode;
//   label: string;
//   onClick?: () => void;
//   isDanger?: boolean;
// }) {
//   return (
//     <>
//       <Box
//         onClick={onClick}
//         sx={{
//           display: "flex",
//           flexDirection: "row-reverse", // ✅ الأيقونة أقصى اليمين
//           alignItems: "center",
//           gap: 2,                      // ✅ مسافة بين الأيقونة والنص
//           py: 2,
//           cursor: onClick ? "pointer" : "default",
//           "&:hover": onClick ? { backgroundColor: "rgba(0,0,0,0.02)" } : {},
//         }}
//       >
//         {/* الأيقونة */}
//         <Box
//           sx={{
//             width: 40,
//             height: 40,
//             borderRadius: "50%",
//             border: `1px solid ${isDanger ? "#d32f2f" : "#0E5F4F"}`,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             color: isDanger ? "#d32f2f" : "#0E5F4F",
//             flexShrink: 0,
//           }}
//         >
//           {icon}
//         </Box>

//         {/* النص */}
//         <Typography
//           sx={{
//             fontSize: "15px",
//             color: isDanger ? "#d32f2f" : "#333",
//             textAlign: "right",
//           }}
//         >
//           {label}
//         </Typography>
//       </Box>

//       <Divider />
//     </>
//   );
// }