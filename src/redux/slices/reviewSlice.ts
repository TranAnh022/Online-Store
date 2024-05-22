import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Review } from "../../types/type";
import {
  createReviewAsync,
  deleteReviewAsync,
  fetchReviewAsync,
} from "../actions/reviewAction";
import { toast } from "react-toastify";

type InitialState = {
  reviews: Review[] | null;
};

const initialState: InitialState = {
  reviews: null,
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchReviewAsync.fulfilled,
      (state, action: PayloadAction<Review[]>) => {
        state.reviews = action.payload;
      }
    );
    builder.addCase(fetchReviewAsync.rejected, (state, action: any) => {
      toast.error(action.payload);
    });

    builder.addCase(
      createReviewAsync.fulfilled,
      (state, action: PayloadAction<Review>) => {
        if (state.reviews) {
          state.reviews.push(action.payload);
        } else {
          state.reviews = [action.payload];
        }
      }
    );
    builder.addCase(createReviewAsync.rejected, (state, action: any) => {
      toast.error(action.payload);
    });
          
    builder.addCase(
      deleteReviewAsync.fulfilled,
      (state, action: PayloadAction<{ data: boolean; id: number }>) => {
        // Filter out the deleted review from the state
        if (action.payload.data === true) {
          state.reviews = (state.reviews || []).filter(
            (review) => review.id !== action.payload.id
          );
        }
      }
    );
    builder.addCase(deleteReviewAsync.rejected, (state, action: any) => {
      toast.error(action.payload);
    });
  },
});

const reviewReducer = reviewSlice.reducer;
export default reviewReducer;
