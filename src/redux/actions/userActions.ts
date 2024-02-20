import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserLogin } from "../../types/type";
import agent from "../../api/agent";

export const userLoginAsync = createAsyncThunk(
  "userLoginAsync",
  async (values: UserLogin,thunkAPI) => {
    try {
      console.log(values);
      const data = await agent.User.login(values);
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
