import { Box, Button, Container, Paper, Typography } from "@mui/material";
import React from "react";
import { buttonStyle } from "../../customizedCSS";
import { Link } from "react-router-dom";
type Props = {
        sum:number
}
function CartSum({sum}:Props) {
  return (
    <Container
      component={Paper}
      sx={{
        width: "full",
        height: "300px",
        textAlign: "center",
        padding: "60px 10px",
        display: "flex",
        flexDirection:'column'
      }}
    >
      <Typography variant="h6"> subtotal:</Typography>
                  <Typography fontSize={{ md: "30px", xs: "20px" }} marginTop={"3px"}>$ {sum}</Typography>
      <Button variant="contained" color="error" sx={buttonStyle}>
        Checkout
      </Button>
      <Box component={Link} to="/" paddingTop={"20px"} color={"blue"}> Countine Shopping</Box>
    </Container>
  );
}

export default CartSum;
