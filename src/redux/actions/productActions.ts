import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  FilterType,
  ProductDto,
  ProductType,
} from "../../types/type";
import agent from "../../api/agent";


export const fetchProductAsync = createAsyncThunk<ProductType, string>(
  "fetchProductAsync",
  async (productId,thunkAPI) => {
    try {
      const data = await agent.Product.details(productId);

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

      const data = await agent.Product.create(product);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

