import React from "react";
import { Box, Icon, Typography } from "@mui/material";
import { footerStyles } from "../../customizedCSS";

const Footer = () => {
  return (
    <footer aria-label="Contact Section">
      <Box sx={footerStyles.container}>
        <Typography variant="h2" sx={footerStyles.heading}>
          Online-Store
        </Typography>
        <Box sx={footerStyles.socialIconContainer}>
          <Box component="a" href="#" sx={footerStyles.socialButton}>
            <Icon
              className="fa fa-facebook"
              sx={footerStyles.socialIcon}
            ></Icon>
          </Box>
          <Box component="a" href="#" sx={footerStyles.socialButton}>
            <Icon className="fa fa-twitter" sx={footerStyles.socialIcon}></Icon>
          </Box>
          <Box component="a" href="#" sx={footerStyles.socialButton}>
            <Icon
              className="fa fa-instagram"
              sx={footerStyles.socialIcon}
            ></Icon>
          </Box>
        </Box>
        <Typography>
          Thank you for shopping with us! Your satisfaction is our top priority.
          Feel free to contact us with any questions or feedback. Happy shopping
        </Typography>
        <Box sx={footerStyles.contactInfo}>
          <Box sx={footerStyles.contactDetails}>
            <Icon
              className="fa fa-phone"
              style={footerStyles.contactIcon}
            ></Icon>
            <span>0129642177</span>
          </Box>
          <Box sx={footerStyles.contactDetails}>
            <Icon
              className="fa fa-envelope"
              style={footerStyles.contactIcon}
            ></Icon>
            <span>namanh022@gmail.com</span>
          </Box>
          <Box sx={footerStyles.contactDetails}>
            <Icon
              className="fa fa-bank"
              style={footerStyles.contactIcon}
            ></Icon>
            <span>Waterside, Butts Green, CB11 4RT</span>
          </Box>
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
