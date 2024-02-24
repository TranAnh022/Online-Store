import React from "react";
import {
  Badge,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/configureStore";
import { listItemStyle, navList, navStyles } from "../../customizedCSS";
import { signOut } from "../../redux/slices/userSlice";
import { ShoppingCart } from "@mui/icons-material";
import HeaderDropDown from "./HeaderDropDown";

const HeaderDrawer = () => {
  const user = useAppSelector((state) => state.user.user);
  const cart = useAppSelector((state) => state.cart.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const itemCount = cart?.products.reduce(
    (sum, product) => sum + product.quantity,
    0
  );
  console.log(cart);
  return (
    <Box sx={navStyles}>
      <Divider sx={{ md: "none" }} />
      {user ? (
        <List sx={navList}>
          <IconButton
            component={Link}
            to="/cart"
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
          >
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <ListItem disablePadding>
            <HeaderDropDown user={user.name} role={user.role} />
          </ListItem>
          <List
            sx={{
              display: {
                md: "none",
              },
            }}
          >
            <ListItem disablePadding>
              <ListItemText primary={user.name} />
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                sx={listItemStyle}
                onClick={() => navigate("/profile")}
              >
                Profile
              </ListItemButton>
            </ListItem>
            {user.role === 1 && (
              <ListItem disablePadding>
                <ListItemButton
                  sx={listItemStyle}
                  onClick={() => navigate("/create")}
                >
                  Create new Product
                </ListItemButton>
              </ListItem>
            )}
            <ListItem disablePadding>
              <ListItemButton
                sx={listItemStyle}
                onClick={() => dispatch(signOut())}
              >
                Logout
              </ListItemButton>
            </ListItem>
          </List>
        </List>
      ) : (
        <List sx={navList}>
          <IconButton
            component={Link}
            to="/cart"
            size="small"
            color="inherit"
            sx={{ mr: 2 }}
          >
            <Badge badgeContent={3} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          {["Login", "Register"].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                sx={listItemStyle}
                component={Link}
                to={`${text.toLowerCase()}`}
              >
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default HeaderDrawer;
