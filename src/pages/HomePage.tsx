import { Box, Container } from "@mui/material";
import HeroBanner from "../components/banner/HeroBanner";
import Products from "../components/products/Products";
import NewLetter from "../components/newLetter";
import Footer from "../components/footer";

function HomePage() {
  return (
    <Box>
      <Container sx={{ marginTop: "5rem", marginBottom: "3rem" }}>
        <HeroBanner />
        <Products />
      </Container>
      <NewLetter />
      <Footer />
    </Box>
  );
}

export default HomePage;
