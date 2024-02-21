import { createSlice } from "@reduxjs/toolkit";
import { TokenState, UserLogin, UserType } from "../../types/type";
import { fetchCurrentUser, userLoginAsync } from "../actions/userActions";
import { router } from "../../router/Routes";

type InitialState = {
  user: UserType | null;
  userLogin: UserLogin | null;
  token: TokenState | null;
};

const initialState: InitialState = {
  user: null,
  userLogin: null,
  token: null,
};

const UserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      router.navigate("/home");
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(userLoginAsync.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        return {
          ...state,
          token: action.payload,
        };
      }
    });

    builder.addCase(userLoginAsync.pending, (state) => {
      return {
        ...state,
      };
    });

    builder.addCase(userLoginAsync.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        return {
          ...state,
        };
      }
    });
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        return {
          ...state,
          user: action.payload,
        };
      }
    });

    builder.addCase(fetchCurrentUser.pending, (state) => {
      return {
        ...state,
      };
    });

    builder.addCase(fetchCurrentUser.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        return {
          ...state,
        };
      }
    });
  },
});

const userReducer = UserSlice.reducer;

export const { setUser, signOut } = UserSlice.actions;

export default userReducer;
