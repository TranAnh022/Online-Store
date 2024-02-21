import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/configureStore";

type Props = {};

function Profile({}: Props) {
  const user = useAppSelector((state) => state.user.user);


  return <div>{user?.name}</div>;
}

export default Profile;
