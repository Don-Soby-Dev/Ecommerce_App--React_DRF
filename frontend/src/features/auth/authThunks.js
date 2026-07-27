import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiLoginUser } from "./authAPI";


export const loginUser = createAsyncThunk('auth/loginUser',
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiLoginUser(data);

            return response.data

        } catch (error) {
            const errorMessage = error?.error?.message || 'Login Failed'
            return rejectWithValue(errorMessage)
        }
    }
)