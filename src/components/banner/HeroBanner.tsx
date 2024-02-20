import {  Button, Grid, Typography } from "@mui/material";
import { bannerContainer, buttonStyle } from "../../customizedCSS";

const HeroBanner = () => {
  return (
    <Grid
      sx={bannerContainer}
      display={"flex"}
      justifyContent={"space-between"}
    >
      <Grid item md={6}>
        <Typography variant="h6" fontWeight={400}>
          Best online store
        </Typography>
        <Typography variant="h2" fontWeight={700}>
          Amazing Deals
        </Typography>
        <Typography variant="h1" color={"white"} fontWeight={700}>
          Up to 50%
        </Typography>
        <Button variant="contained" color="error" sx={buttonStyle}>
          {" "}
          Shop Now
        </Button>
      </Grid>
      <Grid
        item
        md={6}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"flex-end"}
        gap={"2px"}
      >
        <img
          src={`https://static.vecteezy.com/system/resources/previews/022/887/577/non_2x/plain-blue-t-shirt-mockup-template-with-view-front-back-edited-ai-generated-illustration-with-transparent-background-thumbnail-free-png.png`}
          alt="t-shirt"
          className="hero-banner-image"
          style={{
            width: "550px",
            height: "350px",
          }}
        />
        <Typography fontWeight={700} fontSize={16}>
          Description
        </Typography>
        <Typography>Best T-Shirt on the market</Typography>
      </Grid>
    </Grid>
  );
};

export default HeroBanner;
