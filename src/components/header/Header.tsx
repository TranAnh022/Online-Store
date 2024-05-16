import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { drawerWidth } from "../../customizedCSS";
import { Link } from "react-router-dom";
import HeaderDrawer from "./HeaderDrawer";
import { ColorModeContext } from "../contextAPI/ThemeColorProvider.tsx";
import CustomizedSwitches from "./CustomizedSwitches";
import { orange } from "@mui/material/colors";

export default function Header({mode}:{mode:string}) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const colorMode = React.useContext(ColorModeContext);
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        sx={{ backgroundColor: mode === "light" ? `#ff7043` : "#000000" }}
      >
        <Toolbar>
          <Grid container>
            <Grid item md={5} sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h4" noWrap component={Link} to="/">
                Online Store
              </Typography>
              <CustomizedSwitches Mode={colorMode.toggleColorMode} />
            </Grid>
            <Grid item md={7} display={{ xs: "none", md: "block" }}>
              <HeaderDrawer />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <HeaderDrawer />
        </Drawer>
      </Box>
    </Box>
  );
}
