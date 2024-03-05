import { createNewStore } from "../redux/configureStore";
import {
  addToCart,
  removeToCart,
  updateToCart,
} from "../redux/slices/cartSlice";
import { CartItem} from "../types/type";

let store = createNewStore();

beforeEach(() => {
  store = createNewStore();
});


const mockData: CartItem = {
  id: 64,
  title: "Shoes",
  price: 45,
  description: "comfortable shoes",
  images: ['["https://placeimg.com/640/480/any"]'],
  creationAt: "2024-02-29T06:39:33.000Z",
  updatedAt: "2024-02-29T09:47:15.000Z",
  quantity: 1,
  category: {
    id: 1,
    name: "Clothes",
    image: "https://i.imgur.com/QkIa5tT.jpeg",
    creationAt: "2024-02-29T03:37:26.000Z",
    updatedAt: "2024-02-29T03:37:26.000Z",
  },
};


describe("cart reducer", () => {
  test("add to cart", () => {
    store.dispatch(addToCart(mockData));
    const state = store.getState().cart.cart;
    expect(state.products.length).toBe(1);
    expect(state.products[0]).toEqual(mockData);
  });
  test("remove to card", () => {
    store.dispatch(addToCart(mockData));
    store.dispatch(removeToCart(64));
    const state = store.getState().cart.cart;
    console.log(state);
    expect(state.products.length).toBe(0);
  });
  test("update to card", () => {
    store.dispatch(addToCart(mockData));
    store.dispatch(updateToCart({ id: 64, quantity: 3 }));
    expect(store.getState().cart.cart.products[0]).toEqual({
      id: 64,
      title: "Shoes",
      price: 45,
      description: "comfortable shoes",
      images: ['["https://placeimg.com/640/480/any"]'],
      creationAt: "2024-02-29T06:39:33.000Z",
      updatedAt: "2024-02-29T09:47:15.000Z",
      quantity: 3,
      category: {
        id: 1,
        name: "Clothes",
        image: "https://i.imgur.com/QkIa5tT.jpeg",
        creationAt: "2024-02-29T03:37:26.000Z",
        updatedAt: "2024-02-29T03:37:26.000Z",
      },
    });
  });
});
