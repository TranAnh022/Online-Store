import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getStripe from "../../utils/getStripe";

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
  }
);

export const fetchOrdersByUser = createAsyncThunk(
  "fetchOrderByUser",
  async (value: string | undefined, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      let url = `${process.env.REACT_APP_BASE_URL}/orders/user`;
      if (value) {
        url += `?status=${value}`;
      }
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        const errorResponse = response.data;
        return thunkAPI.rejectWithValue(errorResponse);
      }
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const cancelOrders = createAsyncThunk(
  "cancelOrderByUser",
  async (id: string, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/orders/cancel-order/${id}`,
        null,
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
      return { value: response.data, id: id };
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchAllOrder = createAsyncThunk(
  "fetchAllOrder",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/orders`,
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
  }
);

export const deleteOrder = createAsyncThunk(
  "deleteOrder",
  async (id: string, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.delete(
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
      return { value: response.data, id: id };
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const paymentOrder = createAsyncThunk(
  "paymentOrder",
  async (orderId: string, thunkAPI) => {
    try {
      console.log(orderId);
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/orders/create-checkout-session`,
        orderId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const session = response.data;
      console.log(session);
      const stripe = await getStripe();
      await stripe.redirectToCheckout({ sessionId: session });

      return session;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
