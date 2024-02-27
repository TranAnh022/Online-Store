import { PaletteMode, createTheme } from "@mui/material";

export const drawerWidth = 240;

export const customTheme = (paletteType: PaletteMode | undefined) => {
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
  padding: {md:"100px 40px",xs:"50px 20px"},
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
  marginTop: "20px",
  fontSize: {md:"18px",xs:"12px"},
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
  color: "white"
};

export const contactDetailsStyle = {
  margin: "0 30px",
  textAlign: "center",
};

export const iconStyle = {
  color: "#f3b628",
};

export const newLetterStyles = {
  container: {
    paddingTop: "4rem",
  },
  content: {
    padding: "40px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    gap: "2rem",
    backgroundColor: "#f5f5f5",
    width: "100%",
  },
  heading: {
    fontSize: { md: "30px", xs: "20px" },
  },
  hr: {
    width: { md: "40px", xs: "0px" },
  },
  input: {
    height: "50px",
    padding: "20px",
  },
  button: {
    backgroundColor: "#2b2b2b",
    color: "#fff",
    padding: "10px 30px",
    width: "auto",
    borderRadius: "0px",
    transition: "background-color color ease-in-out",
    "&:hover": {
      backgroundColor: "#fff",
      color: "#2b2b2b",
    },
  },
};

export const footerStyles = {
  container: {
    backgroundColor: "#2b2b2b",
    height: "400px",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    gap: "2rem",
    alignItems: "center",
  },
  heading: {
    fontSize: { md: "40px", xs: "30px" },
  },
  socialIconContainer: {
    display: "flex",
    gap: { md: "2rem", xs: "1rem" },
  },
  socialButton: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    borderRadius: "50%",
    backgroundColor: "#f3b628",
    border: "2px solid #fff",
    width: { md: "50px", xs: "30px" },
    height: { md: "50px", xs: "30px" },
  },
  socialIcon: {
    fontSize: { md: "20px", xs: "15px" },
    color: "#fff",
  },
  contactInfo: {
    display: "grid",
    justifyContent: "center",
    alignItems: "center",
    fontSize: { md: "20px", xs: "15px" },
    gridTemplateRows: "1fr 1fr 1fr",
    gap: "1rem",
  },
  contactDetails: {
    textAlign: "center",
  },
  contactIcon: {
    color: "#f3b628",
    paddingRight:"2rem"
  },
};

