import { createAsyncThunk } from "@reduxjs/toolkit";
import { FilterType, ProductDto, ProductType } from "../../types/type";



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
          queryParams.push(`categoryId=${filterMethod.category}`);
        }

        if (filterMethod.price! > 0) {
          queryParams.push(
            `price_min=${filterMethod.price!.toString()}&price_max=1000`
          );
        }

        if (filterMethod.search?.length) {
          queryParams.push(`title=${filterMethod.search}`);
        }

        if (queryParams.length > 0) {
          url += `?${queryParams.join("&")}`;
        }
      }
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchProductAsync = createAsyncThunk<ProductType, number>(
  "product/fetchProduct",
  async (productId: number, thunkAPI) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products/${productId}`);
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

export const createProduct = createAsyncThunk<ProductType, ProductDto>(
  "createProductAsync",
  async (product: ProductDto, thunkAPI) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
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
  { id: number; value: ProductDto }
>("updateProductAsync", async (value, thunkAPI) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products/${value.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value.value),
    });
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
  async (id: number,  thunkAPI ) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products/${id}`, {
        method: "DELETE",
      });
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
