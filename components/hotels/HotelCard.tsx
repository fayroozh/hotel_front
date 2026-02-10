import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";

type Props = {
  title: string;
  image: string;
};

export default function HotelCard({ title, image }: Props) {
  return (
    <Card
      sx={{
        width: "350px",
        height: "400px",
        borderRadius: "20px",
        backgroundColor: "#fff",
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Image wrapper */}
      <Box
        sx={{
          width: "298px",
          height: "280px",
          borderRadius: "15px",
          overflow: "hidden",
          border: "1px solid #045746",
          position: "relative",
          mb: 2,
          mt:1,
        }}
      >
        {/* ⭐ Badge */}
        <Box
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            width: 28,
            height: 28,
            borderRadius: "50%",
            backgroundColor: "#F2C94C",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            fontWeight: 700,
            color: "#fff",
            zIndex: 2,
          }}
        >
          ★
        </Box>

        <CardMedia
          component="img"
          image={image}
          alt={title}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      {/* Content */}
      <CardContent
        sx={{
          p: 0,
          width: "100%",
          textAlign: "right",
        }}
      >
        <Typography
          sx={{
            fontSize: "15px",
            color: "#000",
            mb: 2,
            mr: 3,
          }}
        >
          {title}
        </Typography>

          <Link href="\hotels">
        <Button
          fullWidth
          sx={{
            backgroundColor: "#045746",
            color: "#fff",
            borderRadius: "12px",
            py: 1,
            fontSize: "14px",
            "&:hover": {
              backgroundColor: "#09473A",
            },
          }}
        >
          عرض المزيد
        </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
