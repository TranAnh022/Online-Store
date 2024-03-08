import { Box, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

type Props = {
  message?: string;
};
const NotFound = ({ message }: Props) => {
  return (
    <Box marginTop={"8rem"}>
      <Container maxWidth="md">
        <Grid container spacing={2} direction={"column"}>
          <Grid
            item
            xs={12}
            alignItems={"center"}
            display={"flex"}
            justifyContent={"center"}
          >
            <img
              src="https://www.breathearomatherapy.com/assets/images/global/no-product.png"
              alt="img-notFound"
              style={{ width: "50%", height: "80%", objectFit: "cover" }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            display={"flex"}
            justifyContent={"center"}
            direction={"column"}
            alignItems={"center"}
          >
            <Typography variant="h3">Sorry</Typography>
            <Typography variant="h6">
              {message?.length
                ? message
                : `The page you’re looking for doesn’t exist.`}
            </Typography>
            <Box
              sx={{
                width: { md: "40%", xs: "80%" },
                backgroundColor: "#f02d34",
                color: "white",
                border: "none",
                marginTop: "20px",
                borderRadius: "15px",
                padding: "10px 16px",
              }}
              component={Link}
              to="/"
              textAlign={"center"}
              fontWeight={"700"}
            >
              Back to Homepage
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default NotFound;
