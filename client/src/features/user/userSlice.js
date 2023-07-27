import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";
import {
  signinUserThunk,
  registerUserThunk,
  updateUserThunk,
  signoutUserThunk,
} from "./userThunk";

const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    return registerUserThunk("/api/users/signup", user, thunkAPI);
  }
);

export const signinUser = createAsyncThunk(
  "user/signin",
  async (user, thunkAPI) => {
    return signinUserThunk("/api/users/signin", user, thunkAPI);
  }
);

export const signoutUser = createAsyncThunk(
  "/api/users/signout",
  async (user, thunkAPI) => {
    return signoutUserThunk("/api/users/signout", user, thunkAPI);
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user, thunkAPI) => {
    return updateUserThunk("/auth/updateUser", user, thunkAPI);
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        console.log(payload);
        const user = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`Hello There ${user.name}`);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(signinUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signinUser.fulfilled, (state, { payload }) => {
        const user = payload;
        state.user = user;
        addUserToLocalStorage(user);

        toast.success(`Welcome Back ${user.name}`);
        state.isLoading = false;
      })
      .addCase(signinUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);

        toast.success(`User Updated!`);
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(signoutUser.fulfilled, (state, { payload }) => {
        state.user = null;
        state.isSidebarOpen = false;
        removeUserFromLocalStorage();
        if (payload) {
          toast.success(payload);
        }
      });
  },
});

export const { toggleSidebar } = userSlice.actions;
export default userSlice.reducer;
