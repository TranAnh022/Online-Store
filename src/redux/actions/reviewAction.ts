import { createAsyncThunk } from "@reduxjs/toolkit";
import { Review, ReviewDto } from "../../types/type";
import axios from "axios";

export const fetchReviewAsync = createAsyncThunk(
  "review/fetchReview",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/reviews`);
      if (!response.ok) {
        const errorResponse = await response.json();
        return thunkAPI.rejectWithValue(errorResponse);
      }
      const data: Review[] = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createReviewAsync = createAsyncThunk<Review, ReviewDto>(
  "review/createReview",
  async (values: ReviewDto, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId: values.productId,
            context: values.context,
            rating: values.rating,
          }),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        return thunkAPI.rejectWithValue(errorResponse);
      }

      const data: Review = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteReviewAsync = createAsyncThunk<{data:boolean,id:number},number>(
  "reviews/deleteReview",
  async (id: number, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/reviews/${id}`,
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
      return {data,id};
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        message: error.message || "Something went wrong",
      });
    }
  }
);
