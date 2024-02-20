import {  Container } from "@mui/material";
import HeroBanner from "../components/banner/HeroBanner";
import Products from "../components/products/Products";

function HomePage() {
  return (
    <Container sx={{ marginTop: "5rem", marginBottom: "3rem" }}>
      <HeroBanner />
      <Products />
    </Container>
  );
}

export default HomePage;
