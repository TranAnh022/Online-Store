import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserLogin, UserRegister, UserType } from "../../types/type";
import agent from "../../api/agent";


export const userLoginAsync = createAsyncThunk(
  "userLoginAsync",
  async (values: UserLogin, thunkAPI) => {
    try {
      const data = await agent.User.login(values);
       localStorage.setItem("accessToken", data.access_token);
       localStorage.setItem("refreshToken", data.refresh_token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk<UserType>(
  "fetchCurrentUser",
  async (_, thunkAPI) => {
    try {
      const userInfo = await agent.User.currentUser();
      localStorage.setItem("user", JSON.stringify(userInfo));
      return userInfo;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  },
  //this condition below will determine the async thunk should be executed or not
  {
    condition: () => {
      if (!localStorage.getItem("accessToken")) {
        return false;
      } // if the condition returns false it will be skipped,otherwise, the async thunk will be executed
    },
  }
);

export const userRegisterAsync= createAsyncThunk(
  "userRegisterAsync",
  async (values: UserRegister, thunkAPI) => {
    try {
      const data = await agent.User.register(values);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


