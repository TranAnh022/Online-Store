import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartItem, CartType } from "../../types/type";
import {
  addCartItemAsync,
  fetchCartAsync,
  removeCartItemAsync,
} from "../actions/cartAction";
import { toast } from "react-toastify";

type InitialState = {
  cart: CartType | null;
  status: string;
};

const initialState: InitialState = {
  cart: null,
  status: "idle",
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartType>) => {
      state.cart = action.payload;
    },
    clearCart: (state) => {
      state.cart = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      removeCartItemAsync.fulfilled,
      (state,action: PayloadAction<CartType>) => {
        state.cart = action.payload;
        state.status = "idle";
      }
    );

    builder.addCase(removeCartItemAsync.pending, (state, action) => {
      state.status =
        "pendingRemoveItem" + action.meta.arg.productId + action.meta.arg.name;
    });

    builder.addCase(removeCartItemAsync.rejected, (state, action:any) => {
      state.status = "idle";
  
      toast.error(action.payload);
    });

    builder.addCase(addCartItemAsync.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.status = "idle";
    });

    builder.addCase(addCartItemAsync.pending, (state, action) => {
      state.status = "pendingAddItem" + action.meta.arg.productId;
    });

    builder.addCase(addCartItemAsync.rejected, (state, action: any) => {
      state.status = "idle";
      toast.error(action.payload);
    });

    builder.addCase(fetchCartAsync.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.status = "idle";
    });

    builder.addCase(fetchCartAsync.rejected, (state, action: any) => {
      state.status = "idle";
      toast.error(action.payload.message);
    });
  },
});

const cartReducer = CartSlice.reducer;

export const { clearCart, setCart } = CartSlice.actions;

export default cartReducer;
