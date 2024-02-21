import React from "react";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/configureStore";
import { listItemStyle, navList, navStyles } from "../../customizedCSS";
import { signOut } from "../../redux/slices/userSlice";

const HeaderDrawer = () => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  return (
    <Box sx={navStyles}>
      <List sx={navList}>
        {["Home", "Create", "Contact"].map((text) => (
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
      <Divider sx={{ md: "none" }} />
      {user ? (
        <List sx={navList}>
          <ListItem disablePadding>
            <Typography>{user.name}</Typography>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              sx={listItemStyle}
              onClick={() => dispatch(signOut())}
            >
              Logout
            </ListItemButton>
          </ListItem>
        </List>
      ) : (
        <List sx={navList}>
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
