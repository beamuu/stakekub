import { Box, Button, Paper, Typography } from "@mui/material";
import Link from "next/link";
import { FC } from "react";

interface PageCardProps {
  title: string;
  description: string;
  buttonText?: string;
  href: string;
}

export const PageCard: FC<PageCardProps> = ({
  title,
  description,
  buttonText,
  href,
}) => {
  return (
    <Link
      href={href}
      style={{
        textDecoration: "none",
        cursor: "pointer"
      }}
    >
      <Paper
        className="fly"
        variant="outlined"
        sx={{
          p: 2,
          position: "relative",
          height: "200px",
          borderRadius: 3,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            bottom: "14px",
            right: "14px",
          }}
        >
          <Typography variant="body2" fontWeight={500}>
            {buttonText || "View"} {"->"}
          </Typography>
        </Box>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" fontWeight={500}>
          {description}
        </Typography>
      </Paper>
    </Link>
  );
};
