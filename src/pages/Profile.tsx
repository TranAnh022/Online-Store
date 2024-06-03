import { useEffect } from "react";
import {
  Grid,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Badge,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/configureStore";
import { fetchOrdersByUser } from "../redux/actions/orderAction";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useNavigate } from "react-router-dom";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import {
  InfoBox,
  OrdersContainer,
  ProfileInfo,
  StyledAvatar,
  StyledCard,
  StyledContainer,
} from "../customizedCSS";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import { fetchAllUser } from "../redux/actions/userActions";
import LoadingComponent from "../components/loading/LoadingComponent";
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
  const navigate = useNavigate();

  if (!user || !orders) return <LoadingComponent></LoadingComponent>;
  return (
    <StyledContainer>
      <StyledCard>
        <ProfileInfo>
          <Typography variant="h6" gutterBottom>
            {user?.name}
          </Typography>
          <Tooltip title="Edit profile">
            <IconButton onClick={() => navigate(`/user/${user?.id}`)}>
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
                to={`/order/history`}
                size="small"
                color="inherit"
                onClick={() => dispatch(fetchOrdersByUser("cancelled"))}
              >
                <Badge
                  badgeContent={cancelOrders?.length}
                  color="warning"
                  sx={{ color: "white" }}
                >
                  <CancelOutlinedIcon color="warning" fontSize="large" />
                </Badge>
              </IconButton>

              <Typography variant="body1">Cancelled</Typography>
            </Grid>
            <Grid item xs={4}>
              <IconButton
                component={Link}
                to="/order/history"
                size="small"
                color="inherit"
                onClick={() => dispatch(fetchOrdersByUser("pending"))}
              >
                <Badge
                  badgeContent={pendingOrders?.length}
                  color="warning"
                  sx={{ color: "white" }}
                >
                  <PendingOutlinedIcon color="warning" fontSize="large" />
                </Badge>
              </IconButton>

              <Typography variant="body1">Pending</Typography>
            </Grid>
            <Grid item xs={4}>
              <IconButton
                component={Link}
                to="order/history"
                size="small"
                color="inherit"
                onClick={() => dispatch(fetchOrdersByUser("shipped"))}
              >
                <Badge
                  badgeContent={shippedOrders?.length}
                  color="warning"
                  sx={{ color: "white" }}
                >
                  <LocalShippingOutlinedIcon color="warning" fontSize="large" />
                </Badge>
              </IconButton>
              <Typography variant="body1">Shipped</Typography>
            </Grid>
          </Grid>
        </OrdersContainer>
        {/* --- admin feature ---*/}
        {user?.role === "Admin" && (
          <OrdersContainer>
            <Typography variant="h6" gutterBottom>
              Admin Features
            </Typography>
            <Grid container spacing={8} justifyContent="center" padding={1}>
              <Grid item xs={4}>
                <IconButton
                  component={Link}
                  to="/admin/users"
                  size="small"
                  color="inherit"
                  onClick={() => dispatch(fetchAllUser())}
                >
                  <ManageAccountsOutlinedIcon
                    color="warning"
                    fontSize="large"
                  />
                </IconButton>

                <Typography variant="body1">Manage Users</Typography>
              </Grid>
              <Grid item xs={4}>
                <IconButton
                  component={Link}
                  to="/admin/products"
                  size="small"
                  color="inherit"
                  onClick={() => dispatch(fetchOrdersByUser("pending"))}
                >
                  <Inventory2OutlinedIcon color="warning" fontSize="large" />
                </IconButton>
                <Typography variant="body1">Manage Products</Typography>
              </Grid>
              <Grid item xs={4}>
                <IconButton
                  component={Link}
                  to="/admin/orders"
                  size="small"
                  color="inherit"
                  onClick={() => dispatch(fetchOrdersByUser("shipped"))}
                >
                  <ListAltOutlinedIcon color="warning" fontSize="large" />
                </IconButton>
                <Typography variant="body1">Manage Orders</Typography>
              </Grid>
            </Grid>
          </OrdersContainer>
        )}
      </StyledCard>
    </StyledContainer>
  );
}
