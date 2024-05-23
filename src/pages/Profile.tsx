import React, { useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  styled,
  IconButton,
  Tooltip,
  Badge,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/configureStore";
import { fetchOrdersByUser } from "../redux/actions/orderAction";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingIcon from "@mui/icons-material/Pending";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { OrderStatus } from "../types/type";
const StyledContainer = styled(Container)({
  height: "100vh",
  backgroundColor: "#f5f5f5",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const StyledCard = styled(Card)({
  borderRadius: 15,
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  maxWidth: 400,
  textAlign: "center",
  background: "linear-gradient(135deg, #f96332, #ff8008)",
  color: "#fff",
  padding: "1rem",
});

const ProfileInfo = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const StyledAvatar = styled(Avatar)({
  width: 60,
  height: 60,
  margin: "1rem auto",
  backgroundColor: "#fff",
});

const InfoBox = styled(Box)({
  display: "flex",
  justifyContent: "space-around",
  flexDirection: "column",
  alignItems: "center",
  padding: "1rem 0",
  borderBottom: "1px solid #e0e0e0",
});

const OrdersContainer = styled(Box)({
  backgroundColor: "#fff",
  borderRadius: "15px",
  padding: "1rem",
  marginTop: "1rem",
  color: "#333",
});

export default function ProfileStatistics() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOrdersByUser());
  }, [dispatch]);

  const user = useAppSelector((state) => state.user.user);
  const orders = useAppSelector((state) => state.order.orders);
  const cancelOrders = orders?.filter(
    (order) => order.status.toString() === "Cancelled"
  );
  const pendingOrders = orders?.filter(
    (order) => order.status.toString() === "Pending"
  );
  const shippedOrders = orders?.filter(
    (order) => order.status.toString() === "Shipped"
  );
  console.log(cancelOrders?.length);
  return (
    <StyledContainer>
      <StyledCard>
        <ProfileInfo>
          <Typography variant="h6" gutterBottom>
            {user?.name}
          </Typography>
          <Tooltip title="Edit profile">
            <IconButton>
              <EditIcon style={{ color: "#fff" }} />
            </IconButton>
          </Tooltip>
        </ProfileInfo>
        <Typography variant="body2" style={{ marginBottom: "1rem" }}>
          <StarBorderIcon style={{ verticalAlign: "middle", marginRight: 4 }} />{" "}
          {user?.role}
        </Typography>
        <StyledAvatar src={user?.avatar} />
        <Box display="flex" justifyContent="space-around" mb={3}>
          <InfoBox>
            <FavoriteBorderIcon />
            <Typography variant="body1">5 Wishlist</Typography>
          </InfoBox>
          <InfoBox>
            <LocalOfferIcon />
            <Typography variant="body1">10 Coupons</Typography>
          </InfoBox>
          <InfoBox>
            <StarBorderIcon />
            <Typography variant="body1">55 Points</Typography>
          </InfoBox>
        </Box>
        <OrdersContainer>
          <Typography variant="h6" gutterBottom>
            My Orders
          </Typography>
          <Grid container spacing={8} justifyContent="center" padding={1}>
            <Grid item xs={4}>
              <IconButton
                component={Link}
                to="/cart"
                size="small"
                color="inherit"
              >
                <Badge
                  badgeContent={cancelOrders?.length}
                  color="warning"
                  sx={{ color: "white" }}
                >
                  <CancelIcon color="warning" fontSize="large" />
                </Badge>
              </IconButton>

              <Typography variant="body1">Cancelled</Typography>
            </Grid>
            <Grid item xs={4}>
              <IconButton
                component={Link}
                to="/cart"
                size="small"
                color="inherit"
              >
                <Badge
                  badgeContent={pendingOrders?.length}
                  color="warning"
                  sx={{ color: "white" }}
                >
                  <PendingIcon color="warning" fontSize="large" />
                </Badge>
              </IconButton>

              <Typography variant="body1">Pedning</Typography>
            </Grid>
            <Grid item xs={4}>
              <IconButton
                component={Link}
                to="/cart"
                size="small"
                color="inherit"
              >
                <Badge
                  badgeContent={shippedOrders?.length}
                  color="warning"
                  sx={{ color: "white" }}
                >
                  <LocalShippingIcon color="warning" fontSize="large" />
                </Badge>
              </IconButton>
              <Typography variant="body1">Shipped</Typography>
            </Grid>
          </Grid>
        </OrdersContainer>
      </StyledCard>
    </StyledContainer>
  );
}
