import { Box, Grid } from "@mui/material";

import HeroBanner from "../components/banner/HeroBanner";
import Products from "../components/products/Products";

function HomePage() {
  return (
    <Box>
      <HeroBanner />
      <Products/>
      <Grid>
        <Grid item>{/* search nav */}</Grid>
        <Grid item>{/* list of items */}</Grid>
      </Grid>
    </Box>
  );
}

export default HomePage;
