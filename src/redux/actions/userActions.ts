import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  TokenState,
  UserLogin,
  UserRegister,
  UserType,
} from "../../types/type";
import axios from "axios";

export const userLoginAsync = createAsyncThunk(
  "userLoginAsync",
  async (values: UserLogin, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/login`,
        values
      );

      if (response.status !== 200) {
        const errorResponse = response.data;
        return thunkAPI.rejectWithValue(errorResponse);
      }

      const data: string = response.data;
      localStorage.setItem("accessToken", data);
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
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200) {
        const errorResponse = response.data;
        return thunkAPI.rejectWithValue(errorResponse);
      }

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem("accessToken")) {
        return false;
      }
    },
  }
);

export const userRegisterAsync = createAsyncThunk<UserType, UserRegister>(
  "userRegisterAsync",
  async (values: UserRegister, thunkAPI) => {
    console.log(values);
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users`, {
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
