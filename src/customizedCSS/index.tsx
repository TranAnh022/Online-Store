import { PaletteMode, createTheme } from "@mui/material";

export const drawerWidth = 240;

export const createCustomTheme = (paletteType: PaletteMode | undefined) => {
  return createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#eaeaea" : "#121212",
      },
    },
    typography: {
      fontFamily: '"Roboto", sans-serif',
    },
  });
};

export const navStyles = {
  color: "inherit",
  textDecoration: "none",
  display: { md: "flex" },
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: { xs: "column", md: "row" },
};

export const listItemStyle = {
  borderRadius: "15px",
  "&.active": { color: "text.secondary" },
};

export const navList = {
  display: "flex",
  flexDirection: {
    xs: "column",
    md: "row",
  },
  gap:"5px"
};

export const bannerContainer = {
  padding: "100px 40px",
  backgroundColor: "#dcdcdc",
  borderRadius: "15px",
  position: "relative",
  height: "500px",
  width: "100%",
};

export const buttonStyle = {
  borderRadius: "15px",
  padding: "10px 16px",
  backgroundColor: "#f02d34",
  color: "white",
  border: "none",
  marginTop: "40px",
  fontSize: "18px",
  fontWeight: "500",
  cursor: "pointer",
  transition: "transform 0.5s ease",
  "&:hover": {
    transform: "scale(1.1, 1.1)",
  },
};

export const ProductContainer = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
  padding: "3rem 1rem",
  width: " 100%",
  gap: "100px",
};

export const TitleStyle = {
  fontWeight: "700",
  textAlign: "center",
  fontSize: "2rem",
};

export const LoginContainerStyle = {
  backgroundImage:
    "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
  height: "100vh",
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  color: "white",
};
