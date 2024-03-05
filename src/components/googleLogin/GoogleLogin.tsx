import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useAppDispatch } from "../../redux/configureStore";
import { setUser } from "../../redux/slices/userSlice";



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
    <div>
      LogInWithGoogle
      <button onClick={() => login()}>Login with google</button>
    </div>
  );
}

export default GoogleLogin;
