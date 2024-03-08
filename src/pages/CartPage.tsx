import { Container, Grid, Typography } from "@mui/material";
import CartTable from "../components/cart/CartTable";
import { TitleStyle } from "../customizedCSS";
import CartSum from "../components/cart/CartSum";
import { useAppSelector } from "../redux/configureStore";
import { CartItem } from "../types/type";

function CartPage() {
  const { cart } = useAppSelector((state) => state.cart);
  const sum =
    cart?.products.reduce((sum, item) => sum + item.quantity * item.price, 0) ??
    0;

  const cartPersist = localStorage.getItem("cart");
  const sumPersist: number =
    cartPersist !== null
      ? JSON.parse(cartPersist).products.reduce(
          (sum: number, product: CartItem) =>
            sum + product.quantity * product.price,
          0
        )
      : 0;

  return (
    <Container sx={{ marginY: "10px" }}>
      <Grid container gap={"1rem"}>
        <Grid item xs={12}>
          <Typography textAlign={"center"} sx={TitleStyle}>
            Shopping Cart
          </Typography>
        </Grid>
        <Grid item md={8} xs={12}>
          <CartTable cart={cartPersist ? JSON.parse(cartPersist) : cart} />
        </Grid>
        <Grid
          item
          md={3}
          xs={12}
          alignItems={"center"}
          display={"flex"}
          justifyContent={"center"}
        >
          <CartSum sum={sumPersist ? sumPersist : sum} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default CartPage;
