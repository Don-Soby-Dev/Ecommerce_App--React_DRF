import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    logOut: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.status = "idle";
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
    builder.addCase(loginUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    })
  }
});

export const { setCredentials, logOut, setAuthStatus, setAuthError } = authSlice.actions;
export default authSlice.reducer;
