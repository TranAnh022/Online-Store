import {
  Avatar,
  Box,
  Card,
  Container,
  PaletteMode,
  createTheme,
  styled,
} from "@mui/material";

export const drawerWidth = 240;

export const customTheme = (paletteType: PaletteMode) => {
  return createTheme({
    palette: {
      mode: paletteType,
      ...(paletteType === "light"
        ? {
            background: { default: "#ffff", paper: "#eaeaea" },
          }
        : {
            background: {
              default: "#121212",
              paper: "#333",
            },
            text: {
              primary: "#fff",
              secondary: "#121212",
            },
          }),
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
  gap: "5px",
  justifyContent: "center",
  alignItems: "center",
};

export const buttonStyle = {
  borderRadius: "15px",
  padding: "10px 16px",
  backgroundColor: "#f02d34",
  color: "white",
  border: "none",
  marginTop: "20px",
  fontSize: { md: "18px", xs: "12px" },
  fontWeight: "700",
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
  width: "100%",
  gap: "3rem",
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

export const footerContainerStyle = {
  backgroundColor: "#2b2b2b",
  height: "400px",
  color: "#ffffff",
  display: "flex",
  flexDirection: "column",
  gap: "3rem",
  justifyContent: "center",
  alignItems: "center",
};

export const socialButtonStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "20px",
  height: "60px",
  borderRadius: "50%",
  backgroundColor: "#f3b628",
  border: "2px solid white",
  color: "white",
};

export const contactDetailsStyle = {
  margin: "0 30px",
  textAlign: "center",
};

export const iconStyle = {
  color: "#f3b628",
};

export const newLetterStyles = {
  heading: {
    fontSize: { md: "25px", xs: "15px" },
    fontWeight: "700",
  },
  button: {
    backgroundColor: "#2b2b2b",
    color: "#fff",
    padding: "10px 30px",
    width: "auto",
    borderRadius: "10px",
  },
};

export const aboutTitle = {
  overflow: "hidden",
  display: "inline-block",
  borderRight: "2px solid #091c28",
  whiteSpace: "nowrap",
  margin: 0,
  width: "300px",
  fontSize: { xs: "1rem", md: "3.5rem" },
  animation: "animationCycle 10s infinite",
  "@keyframes animationCycle": {
    "0%, 100%": {
      width: 0,
      borderColor: "transparent",
    },
    "10%": {
      width: "100%",
      borderColor: "transparent",
    },
    "80%": {
      width: "100%",
      borderColor: "transparent",
    },
    "90%, 100%": {
      width: 0,
      borderColor: "#091720",
    },
  },
};
export const StyledContainer = styled(Container)({
  padding: "5rem",
  backgroundColor: "#f5f5f5",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const StyledCard = styled(Card)({
  borderRadius: 15,
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  maxWidth: 400,
  textAlign: "center",
  background: "linear-gradient(135deg, #f96332, #ff8008)",
  color: "#fff",
  padding: "1rem",
});

export const ProfileInfo = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const StyledAvatar = styled(Avatar)({
  width: 60,
  height: 60,
  margin: "1rem auto",
  backgroundColor: "#fff",
});

export const InfoBox = styled(Box)({
  display: "flex",
  justifyContent: "space-around",
  flexDirection: "column",
  alignItems: "center",
  padding: "1rem 0",
  borderBottom: "1px solid #e0e0e0",
});

export const OrdersContainer = styled(Box)({
  backgroundColor: "#fff",
  borderRadius: "15px",
  padding: "1rem",
  marginTop: "1rem",
  color: "#333",
});
