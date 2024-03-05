import {
  Box,
  Typography,
  TextField,
  Divider,
  Grid,
  Button,
  useTheme,
} from "@mui/material";
import { newLetterStyles } from "../../customizedCSS";

const NewLetter = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        padding: "3rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: theme.palette.background.paper,
      }}
      className="newletter"
    >
      <Box
        sx={{
          padding: "40px",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          gap: "1rem",
          backgroundColor: "#fff",
          width: "80%",
          margin: "40px",
          textAlign: "center",
          flexDirection: { md: "row", xs: "column" },
          background: theme.palette.background.default,
          borderRadius:"20px"
        }}
        className="newletter__content"
      >
        <Box>
          <Typography variant="h3" >
            NEWSLETTER
          </Typography>
          <Divider sx={newLetterStyles.hr} />
          <Typography >
            Don't miss out on our latest promotions
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "2rem",
            flexDirection: { md: "row", xs: "column" },
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
