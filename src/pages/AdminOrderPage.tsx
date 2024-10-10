import  { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Container,
  Collapse,
} from "@mui/material";
import { styled } from "@mui/system";
import { useAppDispatch, useAppSelector } from "../redux/configureStore";
import NotFound from "../components/notFound/NotFound";
import { deleteOrder, fetchAllOrder } from "../redux/actions/orderAction";

const OrderCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
}));

const OrderCardHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
}));

const AdminOrderPage = () => {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.order);
  const { user } = useAppSelector((state) => state.user);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  useEffect(() => {
    if (!orders?.length) dispatch(fetchAllOrder());
  }, [orders,dispatch]);

  const handleExpandClick = (OrderId: string) => {
    setExpandedOrderId((prevId) => (prevId === OrderId ? null : OrderId));
  };
  if (user?.role !== "Admin")
    return <NotFound message={"Only Admin Can Access This Page"} />;
  return (
    <Container sx={{ padding: "10rem" }}>
      <Typography variant="h4" gutterBottom>
        Product Management
      </Typography>
      <Grid container direction="column">
        {orders?.map((order) => (
          <OrderCard key={order.id}>
            <OrderCardHeader>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">Order Number : #{order.id}</Typography>
              </CardContent>
              <Box display="flex">
                <Button
                  onClick={() => handleExpandClick(order.id.toString())}
                  variant="contained"
                  color="primary"
                  sx={{ marginRight: 1 }}
                >
                  View
                </Button>
                <Button
                  onClick={() => dispatch(deleteOrder(order.id.toString()))}
                  variant="contained"
                  color="error"
                >
                  Delete
                </Button>
              </Box>
            </OrderCardHeader>
            <Collapse
              in={expandedOrderId === order.id.toString()}
              timeout="auto"
              unmountOnExit
            >
              <CardContent>
                <Typography paragraph>
                  Quantity:{" "}
                  {order.orderItems.reduce(
                    (sum, item) => sum + item.quantity,
                    0
                  )}
                </Typography>
                <Typography paragraph>
                  Date of order : {order.createdAt}
                </Typography>

                <Typography paragraph>Status: {order.status}</Typography>
              </CardContent>
            </Collapse>
          </OrderCard>
        ))}
      </Grid>
    </Container>
  );
};

export default AdminOrderPage;
