import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

type Props = {
  message?: string;
};

function LoadingComponent({ message = "Loading..." }: Props) {
  return (
    <Backdrop open={true} invisible={true}>
      <Box display="flex" justifyContent="center" alignContent="center">
        <CircularProgress size="100" color="secondary" />
        <Typography
          variant="h4"
          sx={{ justifyContent: "center"}}
        >
          {message}
        </Typography>
      </Box>
    </Backdrop>
  );
}

export default LoadingComponent;
