import {
  Box,
  Typography,
  TextField,
  Divider,
  Button,
  useTheme,
} from "@mui/material";
import { newLetterStyles } from "../../customizedCSS";

const NewLetter = () => {
  const theme = useTheme();
  return (
    <Box
      className="newletter"
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginBottom: "2rem",
      }}
    >
      <Box
        sx={{
          background: theme.palette.background.paper,
        }}
        display={"flex"}
        justifyContent={"space-evenly"}
        padding={"3rem"}
        flexDirection={{ md: "row", xs: "column" }}
        textAlign={"center"}
        gap={"5rem"}
      >
        <Box>
          <Typography variant="h4" fontWeight={"500"}>
            NEWSLETTER
          </Typography>
          <Divider sx={{ md: "center", xs: "none" }} />
          <Typography>Don't miss out on our latest promotions</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: { md: "row", xs: "column" },
            gap: "1rem",
          }}
        >
          <TextField placeholder="Your Email ..." variant="outlined" />
          <Button style={newLetterStyles.button}>Submit</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default NewLetter;
