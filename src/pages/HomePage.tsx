import { Box} from "@mui/material";
import Products from "../components/products/Products";
import NewLetter from "../components/newLetter";
import Footer from "../components/footer";
import Banner from "../components/about/Banner";
import { useRef } from "react";
import NewArrival from "../components/products/NewArrival";
import About from "../components/banner/About";

function HomePage() {
  const productsRef = useRef(null);
  return (
    <Box>
      <Banner />
      <NewArrival />
      <Box id="product" ref={productsRef}>
        <Products />
      </Box>
      <About />
      <NewLetter />
      <Footer />
    </Box>
  );
}

export default HomePage;
