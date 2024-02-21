import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import productReducer from "./slices/productSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    user:userReducer
  },
});

export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;