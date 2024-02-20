import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  FilterType,
  ProductDto,
  ProductType,
} from "../../types/type";
import agent from "../../api/agent";

export const fetchAllProductsAsync = createAsyncThunk<ProductType[]>(
  "fetchAllProductsAsync",
  async () => {
    try {
      const data = await agent.Product.list();
      console.log(data)
      return data;
    } catch (e) {
      const error = e as Error;
      return error;
    }
  }
);

export const fetchProductAsync = createAsyncThunk<ProductType, string>(
  "fetchProductAsync",
  async (productId,thunkAPI) => {
    try {
      const data = await agent.Product.details(productId);
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchFilterProduct = createAsyncThunk<ProductType[], FilterType>(
  "fetchFilterProductsAsync",
  async (filterMethod: FilterType,thunkAPI) => {
    if (!filterMethod) return;
    try {
      const data = await agent.Product.filter(filterMethod);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createProduct = createAsyncThunk<ProductType,ProductDto>(
  "createProductAsync",
  async (product: ProductDto,thunkAPI) => {
    try {
      console.log(product);
      const data = await agent.Product.create(product);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

