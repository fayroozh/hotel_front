"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

interface GovernorateCardProps {
  title: string;
  image: string;
}

export default function GovernorateCard({
  title,
  image,
}: GovernorateCardProps) {
  return (
    <Card
      sx={{
        width:"296px",
        height:"467px",
        border: "1.5px solid #045746",
        borderRadius: "20px",
        boxShadow: "none",
        transition: "0.3s",
        overflow: "hidden",

        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
        },
      }}
    >
      <CardActionArea>
        {/* Image */}
        <CardMedia
          component="img"
          height="367px"
          image={image}
          alt={title}
          sx={{
            borderRadius: "16px",
            margin: "12px",
            width: "calc(100% - 24px)",
            objectFit: "cover",
          }}
        />

        {/* Title */}
        <CardContent sx={{ textAlign: "center", pb: 3 }}>
          <Typography
            sx={{
              fontSize: "25px",
              fontWeight: 700,
              color: "#045746",
            }}
          >
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
