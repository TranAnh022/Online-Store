import React from "react";
import { Box, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingIcon from "@mui/icons-material/Pending";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const OrderStatusIcon = ({ status }:{status:any}) => {
  const getStatusIcon = () => {
    switch (status) {
      case "Cancelled":
        return <CancelIcon color="error" fontSize="large" />;
      case "Pending":
        return <PendingIcon color="warning" fontSize="large" />;
      case "Shipped":
        return <LocalShippingIcon color="primary" fontSize="large" />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      {getStatusIcon()}
      <Typography variant="body1">{status}</Typography>
    </Box>
  );
};

export default OrderStatusIcon;
