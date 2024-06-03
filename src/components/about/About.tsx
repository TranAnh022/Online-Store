import { Box, Divider, Grid, Typography, useTheme } from "@mui/material";
import { aboutTitle } from "../../customizedCSS";
import { motion } from "framer-motion";

const About = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1481437156560-3205f6a55735?q=80&w=1795&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        height: "80vh",
        marginBottom: "2rem",
      }}
      display={"flex"}
      justifyContent={"center"}
    >
      <Box
        height="auto"
        display={"flex"}
        alignItems={"center"}
        sx={{
          width: "70%",
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
          marginTop={{ xs: "8rem", md: "0" }}
        >
          <Grid container direction={{ md: "row", xs: "column-reverse" }}>
            <Grid
              item
              display={{ md: "block", xs: "none" }}
              padding={"10px"}
              md={1}
            >
              <Divider sx={{ borderBottom: "2px solid black" }} />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ wordSpacing: "0.5em" }}
              display={"flex"}
              flexDirection={"column"} // Change direction to flexDirection and use it with display="flex"
              gap={"1rem"}
              padding={"20px"}
            >
              <Typography sx={aboutTitle}>Who Are We ?</Typography>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                variants={{
                  hidden: { opacity: 0, x: 50 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <Typography fontSize={{ xs: "0.8rem", md: "1.2rem" }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo,
                  ab fugiat accusantium porro amet animi aliquam facilis
                  tempore. Saepe pariatur non tempora dolorem porro earum
                  dolorum totam sunt impedit harum
                </Typography>
                <Typography
                  fontSize={{ xs: "0.8rem", md: "1.2rem" }}
                  display={{ xs: "none", md: "block" }}
                >
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Natus optio expedita, veniam cumque corrupti qui similique
                  adipisci ex inventore facilis minima quas iure placeat fugiat.
                  Quod laborum sapiente animi placeat.
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={5}>
              <img
                src="https://images.unsplash.com/photo-1481437156560-3205f6a55735?q=80&w=1795&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="about-img"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default About;
