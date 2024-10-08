import { createSlice } from "@reduxjs/toolkit";
import { UserLogin, UserType } from "../../types/type";
import {
  fetchAllUser,
  fetchCurrentUser,
  fetchUserId,
  updateUserAsync,
  userLoginAsync,
  userRegisterAsync,
} from "../actions/userActions";
import { router } from "../../router/Routes";
import { toast } from "react-toastify";

type InitialState = {
  user: UserType | null;
  userLogin: UserLogin | null;
  token: string | null;
  users: UserType[];
  userUpdate: UserType | null;
};

const initialState: InitialState = {
  user: null,
  userLogin: null,
  token: null,
  users: [],
  userUpdate: null
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
      toast.success("Logout successfully");
      router.navigate("/");
    },
    setUser: (state, action) => {
      state.user = action.payload;
      router.navigate("/");
    },
  },
  extraReducers(builder) {
    builder.addCase(userLoginAsync.fulfilled, (state, action: any) => {
      router.navigate("/");
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
      toast.error("Invalid email or password");
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
      state.user = null;
      localStorage.removeItem("user");
      toast.error("Session expired - please login again");
      router.navigate("/");
    });
    builder.addCase(userRegisterAsync.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        return {
          ...state,
          user: action.payload,
        };
      }
    });

    builder.addCase(userRegisterAsync.pending, (state) => {
      return {
        ...state,
      };
    });

    builder.addCase(userRegisterAsync.rejected, (state, action: any) => {
      toast.error(action.payload.message[0]);
    });

    builder.addCase(updateUserAsync.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        router.navigate("/profile");
        toast.success("update user successfully");
        return {
          ...state,
          user: action.payload,
        };
      }
    });

    builder.addCase(updateUserAsync.pending, (state) => {
      return {
        ...state,
      };
    });

    builder.addCase(updateUserAsync.rejected, (state, action: any) => {
      toast.error(action.payload.message[0]);
    });
    builder.addCase(fetchAllUser.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        return {
          ...state,
          users: action.payload,
        };
      }
    });
    builder.addCase(fetchAllUser.pending, (state) => {
      return {
        ...state,
      };
    });
    builder.addCase(fetchAllUser.rejected, (state, action: any) => {
      toast.error(action.payload.message[0]);
    });

    builder.addCase(fetchUserId.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        return {
          ...state,
          userUpdate: action.payload,
        };
      }
    });
    builder.addCase(fetchUserId.pending, (state) => {
      return {
        ...state,
      };
    });
    builder.addCase(fetchUserId.rejected, (state, action: any) => {
      toast.error(action.payload.message[0]);
    });
  },
});

const userReducer = UserSlice.reducer;

export const { setUser, signOut } = UserSlice.actions;

export default userReducer;
