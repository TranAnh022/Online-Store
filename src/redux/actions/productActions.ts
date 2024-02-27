import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  FilterType,
  ProductDto,
  ProductType,
} from "../../types/type";
import agent from "../../api/agent";


export const fetchProductAsync = createAsyncThunk<ProductType, number>(
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
      console.log(data.images[0])
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateProduct = createAsyncThunk<any,{id:number,value:ProductDto}>(
  "updateProductAsync",
  async (value, thunkAPI) => {
    try {
      const data = await agent.Product.update(value.id, value.value);
      console.log(data)
       return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)

export const deleteProduct = createAsyncThunk<boolean, number>(
  "deleteProductAsync",
  async (id, thunkAPI) => {
    try {
      const data = await agent.Product.delete(id);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

