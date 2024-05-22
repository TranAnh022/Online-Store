
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Box,
  Avatar,
  styled,
} from "@mui/material";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { useAppSelector } from "../redux/configureStore";


const StyledContainer = styled(Container)({
  height: "100vh",
  backgroundColor: "#eee",
});

const StyledCard = styled(Card)({
  borderRadius: 15,
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
});

const StyledCardMedia = {
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  margin: "auto",
};

const StyledTypography = styled(Typography)({
  marginBottom: "1rem",
});

export default function ProfileStatistics() {
  const user = useAppSelector(state => state.user.user)
  
  return (
    <StyledContainer>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100%" }}
      >
        <Grid item md={12} xl={4}>
          <StyledCard>
            <CardContent sx={{ textAlign: "center" }}>
              <Box mt={3} mb={4}>
                <Avatar
                  src={user?.avatar}
                  sx={StyledCardMedia}
                />
              </Box>
              <StyledTypography variant="h4">
                {user?.name}
              </StyledTypography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 4 }}>
                @Golen member
                <Box component="span" mx={1}>

                </Box>{" "}
                <a href="#!" style={{ color: "#000" }}>
                 {user?.role}
                </a>
              </Typography>
              <Box mb={4} pb={2}>
                <IconButton aria-label="facebook">
                  <Facebook fontSize="large" />
                </IconButton>
                <IconButton aria-label="twitter" sx={{ mx: 1 }}>
                  <Twitter fontSize="large" />
                </IconButton>
                <IconButton aria-label="instagram">
                  <Instagram fontSize="large" />
                </IconButton>
              </Box>
              <Button
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: "#007bff",
                  color: "#fff",
                  mb: "1rem",
                }}
              >
                Message now
              </Button>
              <Box
                display="flex"
                justifyContent="space-between"
                textAlign="center"
                mt={5}
                mb={2}
              >
                <Box>
                  <Typography variant="h5" sx={{ mb: 1 }}>
                    4123
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Processing
                  </Typography>
                </Box>
                <Box sx={{ px: 3 }}>
                  <Typography variant="h5" sx={{ mb: 1 }}>
                    10234
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Shipped
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5" sx={{ mb: 1 }}>
                    47123
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Review
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </StyledContainer>
  );
}
