import { createSlice } from "@reduxjs/toolkit";
import { Order } from "../../types/type";
import { createOrder, fetchCurrentOrder, fetchOrdersByUser } from "../actions/orderAction";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import { router } from "../../router/Routes";

type InitialState = {
  order: Order | null;
  orders: Order[] | null;
};

const initialState: InitialState = {
  order: null,
  orders: null,
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
  },
});
const orderReducer = OrderSlice.reducer;

export default orderReducer;
