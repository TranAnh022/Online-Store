import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartItem, CartType } from "../../types/type";

type InitialState = {
  cart: CartType;
};

const initialState: InitialState = {
  cart: {
    products: [],
  },
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartType>) => {
      state.cart = action.payload;
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const productIndex = state.cart?.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (productIndex >= 0) {
        state.cart.products[productIndex].quantity += 1;
      } else {
        state.cart.products.push(action.payload);
      }
      localStorage.setItem("cart",JSON.stringify(state.cart))
    },
    removeToCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      state.cart.products = state.cart?.products.filter(
        (product) => product.id !== productId
      );
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    updateToCart: (
      state,
      action: PayloadAction<{ id: number; quantity: number; name?: string }>
    ) => {
      const { id, quantity,name } = action.payload;
      const productIndex = state.cart?.products.findIndex(
        (product) => product.id === id
      );
      if (productIndex >= 0) {
        if (name === "rem") {
          state.cart.products[productIndex].quantity -= 1;
        } else {
          state.cart.products[productIndex].quantity = quantity;
        }
        if (state.cart.products[productIndex].quantity === 0) {
          state.cart.products.splice(productIndex, 1);
        }
        localStorage.setItem("cart", JSON.stringify(state.cart));
      } else {
        throw new Error("Product not found");
      }
    },
  },
});

const cartReducer = CartSlice.reducer;

export const { addToCart, removeToCart, updateToCart,setCart } = CartSlice.actions;

export default cartReducer;
