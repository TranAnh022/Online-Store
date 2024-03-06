import { Diamond, LocalShipping, Support } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";

function NewArrival() {
        return (
          <Box
            sx={{
              width: "100%",
              paddingRight: "20px",
              paddingLeft: "30px",
              marginRight: "auto",
              marginLeft: "auto",
            }}
          >
            <Box
              width={"100%"}
              sx={{ backgroundColor: "#424242" }}
              padding="5%"
              color={"white"}
            >
              <Grid container justifyContent={"space-evenly"} gap={"1rem"}>
                <Grid item md={3} xs={12} display={"flex"} gap={"1rem"}>
                  <LocalShipping color={"warning"} />
                  <Box>
                    <Typography variant="h5" fontWeight={"700"}>
                      FREE DELIVERY
                    </Typography>
                    <Typography>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quod sapiente similique quisquam ab minus
                    </Typography>
                  </Box>
                </Grid>
                <Grid item md={3} xs={12} display={"flex"} gap={"1rem"}>
                  <Diamond color={"warning"} />
                  <Box>
                    <Typography variant="h5" fontWeight={"700"}>
                      HIGH QUALITY
                    </Typography>
                    <Typography>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quod sapiente similique quisquam ab minus harum incidunt

                    </Typography>
                  </Box>
                </Grid>
                <Grid item md={3} xs={12} display={"flex"} gap={"1rem"}>
                  <Support color={"warning"} />
                  <Box>
                    <Typography variant="h5" fontWeight={"700"}>
                      FAST SUPPORT
                    </Typography>
                    <Typography>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quod sapiente similique quisquam ab minus harum incidunt
                      
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        );
}

export default NewArrival;
