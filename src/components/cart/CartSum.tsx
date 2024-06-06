import { Box, Button, Container, Paper, Typography } from "@mui/material";
import React from "react";
import { buttonStyle } from "../../customizedCSS";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../redux/configureStore";
import { createOrder } from "../../redux/actions/orderAction";
import { clearCart } from "../../redux/slices/cartSlice";

type Props = {
  sum: number;
};

const CartSum = ({ sum }: Props) => {
  const dispatch = useAppDispatch();

  const handleCheckout = async () => {
    await dispatch(createOrder());
    await dispatch(clearCart());
  };

  return (
    <Container
      component={Paper}
      sx={{
        width: "100%",
        height: "300px",
        textAlign: "center",
        padding: "60px 10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h6">Subtotal:</Typography>
      <Typography fontSize={{ md: "30px", xs: "20px" }} marginTop={"3px"}>
        ${sum.toFixed(2)}
      </Typography>
      <Button
        variant="contained"
        color="error"
        sx={buttonStyle}
        onClick={handleCheckout}
        style={{ marginTop: "20px" }}
      >
        Checkout
      </Button>
      <Box
        component={Link}
        to="/"
        paddingTop={"20px"}
        color={"blue"}
        sx={{ textDecoration: "none" }}
      >
        Continue Shopping
      </Box>
    </Container>
  );
};

export default CartSum;
