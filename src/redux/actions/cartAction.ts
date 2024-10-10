import { createAsyncThunk } from "@reduxjs/toolkit";

import { CartType } from "../../types/type";
import axios from "axios";

export const fetchCartAsync = createAsyncThunk(
  "cart/fetchCart",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/carts/userCart`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        return thunkAPI.rejectWithValue(errorResponse);
      }
      const data: any = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
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

export const addCartItemAsync = createAsyncThunk<
  CartType,
  { productId: number; quantity?: number }
>("cart/addCartItemAsync", async ({ productId, quantity = 1 }, thunkAPI) => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) return thunkAPI.rejectWithValue("Please log in to add items.");
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/carts`,
      { productId, quantity },
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
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const removeCartItemAsync = createAsyncThunk<
  CartType,
  { productId: number; quantity: number; name?: string }
>("cart/removeCartItemAsync", async ({ productId, quantity }, thunkAPI) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/carts`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          productId,
          quantity,
        },
      }
    );

    if (response.status !== 200) {
      const errorResponse = response.data;
      return thunkAPI.rejectWithValue(errorResponse);
    }

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
