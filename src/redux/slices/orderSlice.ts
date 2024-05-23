import { createSlice } from "@reduxjs/toolkit";
import { Order } from "../../types/type";
import {
  cancelOrders,
  createOrder,
  deleteOrder,
  fetchAllOrder,
  fetchCurrentOrder,
  fetchOrdersByUser,
} from "../actions/orderAction";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import { router } from "../../router/Routes";

type InitialState = {
  order: Order | null;
  orders: Order[] | null;
};

const initialState: InitialState = {
  order: null,
  orders: [],
};

const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createOrder.fulfilled, (state, action: any) => {
      state.order = action.payload;
      router.navigate(`/checkout/${action.payload.id}`);
    });

    builder.addCase(createOrder.rejected, (state, action: any) => {
      toast.error(action.payload);
    });
    builder.addCase(fetchCurrentOrder.fulfilled, (state, action: any) => {
      state.order = action.payload;
    });

    builder.addCase(fetchCurrentOrder.rejected, (state, action: any) => {
      toast.error(action.payload);
    });
    builder.addCase(fetchOrdersByUser.fulfilled, (state, action: any) => {
      state.orders = action.payload;
    });

    builder.addCase(fetchOrdersByUser.rejected, (state, action: any) => {
      toast.error(action.payload);
    });
    builder.addCase(cancelOrders.fulfilled, (state, action) => {
      if (action.payload.value === true && state.orders) {
        state.orders = state.orders?.filter(
          (order) => order.id.toString() !== action.payload.id
        );
      }
    });

    builder.addCase(cancelOrders.rejected, (state, action: any) => {
      toast.error(action.payload);
    });

    builder.addCase(fetchAllOrder.fulfilled, (state, action: any) => {
      state.orders = action.payload;
    });

    builder.addCase(fetchAllOrder.rejected, (state, action: any) => {
      toast.error(action.payload);
    });
    builder.addCase(deleteOrder.fulfilled, (state, action: any) => {
      if (action.payload.value === true && state.orders) {
        state.orders = state.orders?.filter(
          (order) => order.id.toString() !== action.payload.id
        );
      }
    });

    builder.addCase(deleteOrder.rejected, (state, action: any) => {
      toast.error(action.payload);
    });
  },
});
const orderReducer = OrderSlice.reducer;

export default orderReducer;
