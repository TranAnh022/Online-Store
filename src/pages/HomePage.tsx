import { Box, Grid } from "@mui/material";

import HeroBanner from "../components/banner/HeroBanner";
import Products from "../components/products/Products";

function HomePage() {
  return (
    <Box>
      <HeroBanner />
      <Products/>
      
    </Box>
  );
}

export default HomePage;
