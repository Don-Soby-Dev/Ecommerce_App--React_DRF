import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiLoginUser } from "./authAPI";
import { logOut } from "./authSlice";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiLoginUser(data);
      console.log(response.data);

      return response.data.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please check your credentials.";
      return rejectWithValue(errorMessage);
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { dispatch }) => {
    try {
      await api.post("/api/auth/logout/");
    } catch (error) {
      console.warn(
        "Server logout failed or token expired, clearing local state.",
      );
    } finally {
      dispatch(logOut());
    }
  },
);
