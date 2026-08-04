import { createSlice } from "@reduxjs/toolkit";
import { loginUser, checkAuth } from "./authThunks";

const initialState = {
  user: null,
  accessToken: null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  isCheckingAuth: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
    },
    logOut: (state) => {
      state.user = null;
      state.accessToken = null;
      state.status = "idle";
      state.isCheckingAuth = false;
      state.error = null;
    },
    setAuthStatus: (state, action) => {
      state.status = action.payload;
    },
    setAuthError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user || null;
        state.accessToken =
          action.payload.accessToken || action.payload.access_token || null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isCheckingAuth = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isCheckingAuth = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isCheckingAuth = false;
      });
  },
});

export const { setCredentials, logOut, setAuthStatus, setAuthError } =
  authSlice.actions;
export default authSlice.reducer;
