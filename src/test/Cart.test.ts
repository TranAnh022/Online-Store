import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/slices/cartSlice";
import {
  addCartItemAsync,
  removeCartItemAsync,
} from "../redux/actions/cartAction";
// Adjust the import path according to your project structure

const mockProduct = {
  id: 64,
  title: "Shoes",
  price: 45,
  description: "comfortable shoes",
  images: [
    {
      id: 1232131414,
      productId: 64,
      url: "https://placeimg.com/640/480/any",
    },
  ],
  inventory: 100,
  category: {
    id: 1,
    name: "Clothes",
    image: "https://i.imgur.com/QkIa5tT.jpeg",
  },
};

const mockCartItem = {
  id: 1,
  product: mockProduct,
  cartId: 1,
  quantity: 1,
};

const mockCart = {
  id: 1,
  userId: "123e4567-e89b-12d3-a456-426614174000",
  items: [mockCartItem],
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

describe("cart reducer", () => {
  test("add to cart", () => {
    store.dispatch(
      addCartItemAsync({
        productId: mockProduct.id,
        quantity: mockCartItem.quantity,
      })
    );
    const state = store.getState().cart.cart;
    expect(state?.items.length).toBe(1);
    expect(state?.items[0].product).toEqual(mockProduct);
  });

  test("remove from cart", () => {
    store.dispatch(
      addCartItemAsync({
        productId: mockProduct.id,
        quantity: mockCartItem.quantity,
      })
    );
    store.dispatch(
      removeCartItemAsync({
        productId: mockProduct.id,
        quantity: mockCartItem.quantity,
      })
    );
    const state = store.getState().cart.cart;
    expect(state?.items.length).toBe(0);
  });
});
