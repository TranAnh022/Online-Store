export const drawerWidth = 240;

export const navStyles = {
  color: "inherit",
  textDecoration: "none",
  display: { md: "flex" },
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: { xs: "column", md: "row" },
};

export const listItemStyle = {
  typography: "h6",
  borderRadius: "15px",
  "&.active": { color: "text.secondary" },
};

export const navList = {
  display: "flex",
  flexDirection: { xs: "column", md: "row" },
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
  zIndex: "10000",
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
