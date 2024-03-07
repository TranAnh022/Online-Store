import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

function NotFoundProduct() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "auto",
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2} direction={"column"}>
          <Grid item xs={12}>
            <img
              src="https://www.breathearomatherapy.com/assets/images/global/no-product.png"
              alt="img-notFound"
              style={{ width: "70%", height: "70%", objectFit: "cover" }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h3">Sorry</Typography>
            <Typography variant="h6">
              The product you’re looking for doesn’t exist.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default NotFoundProduct;
