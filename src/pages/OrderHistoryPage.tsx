import { useEffect } from "react";
import {
  Container,
  Card,
  Typography,
  Box,
  styled,
  Button,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/configureStore";
import {
  cancelOrders,
  fetchOrdersByUser,
} from "../redux/actions/orderAction";
import ProductOrder from "../components/products/ProductOrder";
import NotFound from "../components/notFound/NotFound";
import { useNavigate, useParams } from "react-router-dom";

const StyledContainer = styled(Container)({
  backgroundColor: "#f5f5f5",
  padding: "7rem",
});

const StyledCard = styled(Card)({
  marginBottom: "1rem",
  padding: "1rem",
  display: "flex",
  gap: "2rem",
  flexDirection: "column",
});

const OrderInfo = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "",
  marginBottom: "1rem",
});

const TotalAmountContainer = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "flex-end",
  marginTop: "1rem",
  flexDirection: "column",
  marginBottom: "2rem",
});

export default function OrderHistory() {
  const { status } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const orders = useAppSelector((state) => state.order.orders);

  useEffect(() => {
    dispatch(fetchOrdersByUser());
  }, [dispatch]);

  const filteredOrders = orders?.filter(
    (order) => order.status.toString().toLowerCase() === status
  );

  if (!filteredOrders?.length || !status)
    return (
      <NotFound message="No orders found with the specified status"></NotFound>
    );

  return (
    <StyledContainer>
      <Typography variant="h4" gutterBottom>
        Orders History ({status.charAt(0).toUpperCase() + status.slice(1)})
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        Incidunt molestiae amet hic labore soluta perferendis accusantium fugiat
        earum nesciunt.
      </Typography>
      {filteredOrders.map((order, index) => (
        <Container key={index}>
          <StyledCard key={index}>
            <Box display={"flex"} gap={"10rem"}>
              <OrderInfo>
                <Typography variant="body2">Order number</Typography>
                <Typography variant="body2">{order.id}</Typography>
              </OrderInfo>
              <OrderInfo>
                <Typography variant="body2">Date of order</Typography>
                <Typography variant="body2">
                  {order.createdAt.slice(0, 10)}
                </Typography>
              </OrderInfo>
              <OrderInfo>
                <Typography variant="body2">Order Status</Typography>
                <Typography variant="body2">{order.status}</Typography>
              </OrderInfo>
            </Box>

            {order.orderItems.map((item, index) => (
              <ProductOrder item={item} key={index}></ProductOrder>
            ))}
          </StyledCard>
          <TotalAmountContainer>
            <Typography variant="h6" mr={2}>
              Total amount: $
              {order?.orderItems
                .reduce(
                  (sum, item) =>
                    sum + item.quantity * item.productSnapshot.price,
                  0
                )
                .toFixed(2)}
            </Typography>
            {order.status.toString() !== "Cancelled" && (
              <Box display={"flex"} gap={"10px"}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => dispatch(cancelOrders(order.id.toString()))}
                >
                  Cancel Order
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/checkout/${order.id.toString()}`)}
                >
                  View Order Details
                </Button>
              </Box>
            )}
          </TotalAmountContainer>
        </Container>
      ))}
    </StyledContainer>
  );
}
