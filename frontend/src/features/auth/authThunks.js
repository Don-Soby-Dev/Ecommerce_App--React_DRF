import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiLoginUser } from "./authAPI";

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
