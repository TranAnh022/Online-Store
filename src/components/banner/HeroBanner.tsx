import { Button, Grid, Typography } from "@mui/material";
import { bannerContainer, buttonStyle } from "../../customizedCSS";

const HeroBanner = () => {
  return (
    <Grid
      sx={bannerContainer}
      display={{ xs: "block", md: "flex" }}
      justifyContent={"space-between"}
      alignItems={{ xs: "center", md: "flex-start" }}
    >
      <Grid item md={6} xs={12}>
        <Typography fontWeight={400} fontSize={{ xs: "12px", md: "20px" }}>
          Best online store
        </Typography>
        <Typography fontWeight={700} fontSize={{ xs: "25px", md: "40px" }}>
          Amazing Deals
        </Typography>
        <Typography
          color={"white"}
          fontWeight={700}
          fontSize={{ xs: "40px", md: "60px" }}
        >
          Sale Up to 50%
        </Typography>
        <Button variant="contained" color="error" sx={buttonStyle}>
          Shop Now
        </Button>
      </Grid>
      <Grid item md={6} xs={12}>
        <img
          src={`https://static.vecteezy.com/system/resources/previews/022/887/577/non_2x/plain-blue-t-shirt-mockup-template-with-view-front-back-edited-ai-generated-illustration-with-transparent-background-thumbnail-free-png.png`}
          alt="t-shirt"
          className="hero-banner-image"
          style={{
            width: "100%",
            height: "auto",
            maxWidth: "550px",
          }}
        />
        <div>
          <Typography fontWeight={700} fontSize={{ xs: 14, md: 16 }}>
            Description
          </Typography>
          <Typography>Best T-Shirt on the market</Typography>
        </div>
      </Grid>
    </Grid>
  );
};

export default HeroBanner;
