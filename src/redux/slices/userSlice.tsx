import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserLogin, UserType } from "../../types/type";
import { userLoginAsync } from "../actions/userActions";

type InitialState = {
  user: UserType | null;
  userLogin: UserLogin | null;
};

const initialState: InitialState = {
  user: null,
  userLogin: null,
};

const UserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
        extraReducers(builder) {
          builder.addCase(userLoginAsync.fulfilled, (state, action) => {
            if (!(action.payload instanceof Error)) {
              return {
                ...state,
                user: action.payload,
                loading: false,
              };
            }
          });

          builder.addCase(userLoginAsync.pending, (state, action) => {
            return {
              ...state,
              loading: true,
            };
          });

          builder.addCase(userLoginAsync.rejected, (state, action) => {
            if (action.payload instanceof Error) {
              return {
                ...state,
                loading: false,
                error: action.payload.message,
              };
            }
          });
  },
});

const userReducer = UserSlice.reducer;

export const {} = UserSlice.actions;

export default userReducer;
