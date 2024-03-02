import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  TokenState,
  UserLogin,
  UserRegister,
  UserType,
} from "../../types/type";


let baseURL = "https://api.escuelajs.co/api/v1";

export const userLoginAsync = createAsyncThunk(
  "userLoginAsync",
  async (values: UserLogin, thunkAPI) => {
    try {
      const response = await fetch(`${baseURL}/auth/login`, {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        return thunkAPI.rejectWithValue(errorResponse);
      }
      const data: TokenState = await response.json();
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
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${baseURL}/auth/profile`, {
        method: "Get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        return thunkAPI.rejectWithValue(errorResponse);
      }
      const data: UserType = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      return data;
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

export const userRegisterAsync = createAsyncThunk<UserType, UserRegister>(
  "userRegisterAsync",
  async (values: UserRegister, thunkAPI) => {
    try {
      const response = await fetch(`${baseURL}/users`, {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        return thunkAPI.rejectWithValue(errorResponse);
      }
      const data: UserType = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
