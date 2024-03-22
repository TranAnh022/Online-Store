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
          >
            <Badge
              badgeContent={itemCount}
              color="secondary"
            >
              <ShoppingCart />
            </Badge>
          </IconButton>
          <HeaderDropDown user={user} />
          <List sx={{ display: { md: "none" } }}>
            <ListItemButton>{user.name}</ListItemButton>
            <ListItemButton
              sx={listItemStyle}
              onClick={() => navigate("/profile")}
            >
              Profile
            </ListItemButton>
            {user.role === "admin" && (
              <ListItem disablePadding>
                <ListItemButton
                  sx={listItemStyle}
                  onClick={() => navigate("/create")}
                >
                  Create new Product
                </ListItemButton>
              </ListItem>
            )}
            <ListItemButton
              sx={listItemStyle}
              onClick={() => dispatch(signOut())}
            >
              Logout
            </ListItemButton>
          </List>
        </List>
      ) : (
        <List sx={navList}>
          <ListItem>
            <IconButton
              component={Link}
              to="/cart"
              size="large"
              color="inherit"
            >
              <Badge
                badgeContent={itemCount}
                color="secondary"
              >
                <ShoppingCart />
              </Badge>
            </IconButton>
          </ListItem>
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
