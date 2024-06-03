import {
  Box,
  Button,
  Divider,
  Grid,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/configureStore";
import ProductOrder from "../components/products/ProductOrder";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchCurrentOrder, paymentOrder } from "../redux/actions/orderAction";
import LoadingComponent from "../components/loading/LoadingComponent";

const OrderReview = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { order } = useAppSelector((state) => state.order);

  useEffect(() => {
    if (id) {
      dispatch(fetchCurrentOrder(id));
    }
  }, [dispatch, id]);

  const totalItem = order?.orderItems.reduce(
    (sum, item) => item.quantity + sum,
    0
  );
  const subtotal =
    order?.orderItems.reduce(
      (sum, item) => sum + item.quantity * item.productSnapshot.price,
      0
    ) ?? 0;
  const deliveryFee = subtotal > 500 ? 0 : 20;
  if (!order) return <LoadingComponent></LoadingComponent>;
  return (
    <Box sx={{ padding: "100px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Typography variant="h5" mb="5px">
            Order Number #{order?.id}
          </Typography>
          <Typography variant="body2" color="textSecondary" mb="10px">
            Status : {order?.status}
          </Typography>
          <Card>
            <CardContent
              sx={{ display: "flex", gap: "1rem", flexDirection: "column" }}
            >
              <Typography variant="h6">Products Review</Typography>
              <Divider />
              {order?.orderItems.map((item) => (
                <ProductOrder key={item.id} item={item} />
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Order summary</Typography>
              <Divider />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <Typography variant="body1">
                  Subtotal ({totalItem} items)
                </Typography>
                <Typography variant="body1">${subtotal.toFixed(2)}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <Typography variant="body1">Shipping</Typography>
                <Typography variant="body1">
                  ${deliveryFee.toFixed(2)}
                </Typography>
              </Box>
              <Typography variant="body2" color="textSecondary">
                Free ship for orders over $500
              </Typography>
              <Divider sx={{ marginY: "10px" }} />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">
                  ${(subtotal + deliveryFee).toFixed(2)}
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="error"
                fullWidth
                sx={{ marginTop: "10px" }}
                onClick={() => dispatch(paymentOrder(order.id.toString()))}
              >
                Pay with Stripe
              </Button>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ marginTop: "10px" }}
              >
                By placing an order, you agree to Target's terms and privacy
                policy.
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Order confirmation and updates will be emailed to
                onlinestore.fs17@gmail.com
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderReview;
