import { createAsyncThunk } from "@reduxjs/toolkit";
import { FilterType, ProductType } from "../../types/type";

import axios from "axios";

export const fetchFilterProduct = createAsyncThunk<
  ProductType[],
  FilterType | undefined
>(
  "fetchFilterProductsAsync",
  async (filterMethod: FilterType | undefined, thunkAPI) => {
    try {
      let url = `${process.env.REACT_APP_BASE_URL}/products`;

      if (filterMethod) {
        const queryParams: string[] = [];

        if (filterMethod.category?.length) {
          queryParams.push(`SortBy=${filterMethod.category}`);
        }

        if (filterMethod.price! > 0) {
          queryParams.push(
            `MinPrice=${filterMethod.price!.toString()}&MaxPrice=1000`
          );
        }

        if (filterMethod.search?.length) {
          queryParams.push(`Search=${filterMethod.search}`);
        }

        if (queryParams.length > 0) {
          url += `?${queryParams.join("&")}`;
        }
      }
      const response = await axios.get(url);
      const data = await response.data;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchProductAsync = createAsyncThunk<ProductType, string>(
  "product/fetchProduct",
  async (productId: string, thunkAPI) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/products/${productId}`
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        return thunkAPI.rejectWithValue(errorResponse);
      }
      const data: ProductType = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createProduct = createAsyncThunk<ProductType, FormData>(
  "createProductAsync",
  async (formData: FormData, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/products`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        return thunkAPI.rejectWithValue(errorResponse);
      }
      const data: ProductType = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateProduct = createAsyncThunk<
  any,
  { id: string; value: FormData }
>("updateProductAsync", async (value, thunkAPI) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/products/${value.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: value.value,
      }
    );
    if (!response.ok) {
      const errorResponse = await response.json();
      return thunkAPI.rejectWithValue(errorResponse);
    }
    const data: ProductType = await response.json();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async (id: number, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/products/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        return thunkAPI.rejectWithValue(errorResponse);
      }
      const data: boolean = await response.json();
      return data;
    } catch (e) {
      const error = e as Error;
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCategory = createAsyncThunk(
  "category/fetchCategory",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/categories`
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        return thunkAPI.rejectWithValue(errorResponse);
      }
      const data = await response.json();
      return data;
    } catch (e) {
      const error = e as Error;
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);
