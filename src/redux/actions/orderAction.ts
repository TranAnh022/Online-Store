import { createAsyncThunk } from "@reduxjs/toolkit";
import { Order } from "../../types/type";
import axios from "axios";

export const createOrder = createAsyncThunk(
  "createOrderAsync",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/orders`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        return thunkAPI.rejectWithValue(errorResponse);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchCurrentOrder = createAsyncThunk(
  "fetchCurrentOrder",
  async (id: string, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/orders/${id}`,
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


export const fetchOrdersByUser = createAsyncThunk(
  "fetchOrderByUser",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/orders/user`,
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