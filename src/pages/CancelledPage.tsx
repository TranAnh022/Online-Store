import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Link as MuiLink,
  useTheme,
} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Link } from "react-router-dom";
type Props = {};

function CancelledPage({}: Props) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: `${theme.palette.background.default}`,
        minHeight: "60vh",
      }}
    >
      <Box
        sx={{
          width: "1000px",
          margin: "auto",
          marginTop: "160px",
          backgroundColor: `${theme.palette.background.paper}`,
          padding: "50px",
          borderRadius: "15px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box className="icon" sx={{ color: "#ff7043", fontSize: "40px" }}>
          <ShoppingBagIcon />
        </Box>
        <Typography
          variant="h2"
          sx={{
            textTransform: "capitalize",
            marginTop: "15px 0px",
            fontWeight: 900,
            fontSize: "40px",
            color: "#ff7043",
          }}
        >
          The payment process has been interupted !!!
        </Typography>
        <Typography
          className="email-msg"
          sx={{ fontSize: "16px", fontWeight: 600, textAlign: "center" }}
        >
        </Typography>
        <Typography
          className="description"
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            textAlign: "center",
            margin: "10px",
            marginTop: "30px",
          }}
        >
          If you have any question, please email
          <MuiLink
            href="mailto:namanh022@gmail.com"
            sx={{ marginLeft: "5px", color: "#f02d34" }}
          >
            Online-Store@gmail.com
          </MuiLink>
        </Typography>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary" sx={{ width: "300px" }}>
            Continue Shopping
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

export default CancelledPage;
