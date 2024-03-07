import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useAppDispatch } from "../../redux/configureStore";
import { setUser } from "../../redux/slices/userSlice";
import { Google } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

function GoogleLogin() {
  const dispatch = useAppDispatch();
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const res = await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse.access_token}`
      );
      const userInfo = await res.json();
      dispatch(
        setUser({
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.name,
          role: "customer",
          avatar: userInfo.picture,
        })
      );
    },
  });
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      gap={"0.5rem"}
      alignItems={"center"}
    >
      <Typography fontSize={"15px"}>LogIn With Google</Typography>
      <Google
        fontSize={"small"}
        color="error"
        onClick={() => login()}
        sx={{ cursor: "pointer" }}
      />
    </Box>
  );
}

export default GoogleLogin;
