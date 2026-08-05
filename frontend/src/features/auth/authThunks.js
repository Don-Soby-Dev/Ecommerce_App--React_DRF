import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiLoginUser,
  apiLogoutUser,
  apiRefreshTokenUser,
  apiGetUser,
} from "./authAPI";
import { logOut, setCredentials } from "./authSlice";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiLoginUser(data);
      console.log(response.data);

      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "Login failed. Please check your credentials.";
      return rejectWithValue(errorMessage);
    }
  },
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const refreshResponse = await apiRefreshTokenUser();
      const newAccessToken = refreshResponse.data.access_token;

      dispatch(setCredentials({ accessToken: newAccessToken, user: null }));

      const userResponse = await apiGetUser();
      const user = userResponse.user || userResponse.data?.user || userResponse;

      dispatch(setCredentials({ accessToken: newAccessToken, user }));
      return { accessToken: newAccessToken, user };
    } catch (error) {
      dispatch(logOut());
      return rejectWithValue("Session expired or unauthenticated.");
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { dispatch }) => {
    try {
      await apiLogoutUser();
    } catch (error) {
      console.warn(
        "Server logout failed or token expired, clearing local state.",
      );
    } finally {
      dispatch(logOut());
    }
  },
);
