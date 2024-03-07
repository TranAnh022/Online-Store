import {
  Box,
  Button,
  Divider,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { buttonStyle } from "../../customizedCSS";
import { motion } from "framer-motion";

function About() {
  const handleScrollToProducts = () => {
    const productsSection = document.getElementById("product");
    if (productsSection) {
      window.scrollTo({
        top: productsSection.offsetTop,
        behavior: "smooth",
      });
    }
  };
  const theme = useTheme();
  return (
    <Box
      height={"100vh"}
      display={"flex"}
      alignItems={"center"}
      sx={{
        width: "100%",
        paddingRight: "15px",
        paddingLeft: "15px",
        marginRight: "auto",
        marginLeft: "auto",
      }}
    >
      <Box
        sx={{
          backgroundColor: `${theme.palette.background.paper}`,
        }}
        padding={{ md: "30px", xs: "10px" }}
        marginTop={{ xs: "8rem", md: "2rem" }}
      >
        <Grid container direction={{ md: "row", xs: "column-reverse" }}>
          <Grid
            item
            display={{ md: "block", xs: "none" }}
            padding={"10px"}
            md={1}
          >
            <Typography fontSize={"20px"} color={"#f75843"} fontWeight={"500"}>
              Fashion
            </Typography>
            <Divider sx={{ borderBottom: "2px solid black" }} />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ wordSpacing: "0.5em" }}
            display={"flex"}
            direction={"column"}
            gap={"1rem"}
            padding={"20px"}
          >
            <motion.div
              initial="hidden"

              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <Typography
                fontSize={{ xs: "1.2rem", md: "2.5rem" }}
                fontWeight={"700"}
                lineHeight={"1.5"}
                fontFamily={"Overpass, sans-serif"}
              >
                DISCOVER AND SHOP YOUR UNIQUE STYLE WITH EASE.
              </Typography>

              <Typography fontSize={{ xs: "0.8rem", md: "1.2rem" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, ab
                fugiat accusantium porro amet animi aliquam facilis tempore.
                Saepe pariatur non tempora dolorem porro earum dolorum totam
                sunt impedit harum. Lorem ipsum dolor, sit amet consectetur
                adipisicing elit. Natus optio expedita, veniam cumque corrupti
                qui similique adipisci ex inventore facilis minima quas iure
                placeat fugiat. Quod laborum sapiente animi placeat.
              </Typography>
            </motion.div>
            <Typography>
              <Button
                variant="contained"
                color="error"
                onClick={handleScrollToProducts}
                sx={buttonStyle}
              >
                Shop Now
              </Button>
            </Typography>
          </Grid>
          <Grid item xs={12} md={5}>
            <img
              src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default About;
