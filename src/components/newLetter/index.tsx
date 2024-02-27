import React from "react";
import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import { newLetterStyles } from "../../customizedCSS";

const NewLetter = () => {
  return (
    <Box sx={newLetterStyles.container} className="newletter">
      <Box sx={newLetterStyles.content} className="newletter__content">
        <Typography variant="h3" sx={newLetterStyles.heading}>
          NEWSLETTER
        </Typography>
        <Divider sx={newLetterStyles.hr} />
        <Typography>Don't miss out on our latest promotions</Typography>
        <TextField style={newLetterStyles.input} placeholder="Email" />
        <button style={newLetterStyles.button}>Submit</button>
      </Box>
    </Box>
  );
};

export default NewLetter;
