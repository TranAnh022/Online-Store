import { createAsyncThunk } from "@reduxjs/toolkit";
import { FilterType, ProductDto, ProductType } from "../types/type";
import agent from "../api/agent";

export const fetchAllProductsAsync = createAsyncThunk<ProductType[]>(
  "fetchAllProductsAsync",
  async () => {
    try {
      const data = await agent.Product.list();
      return data;
    } catch (e) {
      const error = e as Error;
      return error;
    }
  }
);

export const fetchProductAsync = createAsyncThunk<ProductType, string>(
  "fetchProductAsync",
  async (productId) => {
    try {
      const data = await agent.Product.details(productId);
      console.log(data);
      return data;
    } catch (e) {
      const error = e as Error;
      return error;
    }
  }
);

export const fetchFilterProduct = createAsyncThunk(
  "fetchFilterProductsAsync",
  async (filterMethod: FilterType) => {
    try {
      const data = await agent.Product.filter(filterMethod);
      return data;
    } catch (e) {
      const error = e as Error;
      return error;
    }
  }
);

export const createProduct = createAsyncThunk(
  "createProductAsync",
  async (product:ProductDto ) => {
    try {
      console.log(product);
      const data = await agent.Product.create(product);
      return data;
    } catch (e) {
      const error = e as Error;
      return error;
    }
  }
);
