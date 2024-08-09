'use client';

import authService from "@/services/authService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//@ts-expect-error
const user = JSON.parse(localStorage.getItem("user"))

const initialState = {
    user: user,
    error: false,
    success: false,
    loading: false
};

export const singUp = createAsyncThunk("/register", async(user, thunkAPI) => {
    const data = await authService.register(user);
    if(data.error){
        return thunkAPI.rejectWithValue(data.error)
    };
    return data
});

export const login = createAsyncThunk("/login", async (user, thunkAPI) => {
    const data = await authService.login(user);
    if(data.error){
        return thunkAPI.rejectWithValue(data.error)
    };
    return data
})

export const logout = createAsyncThunk("/logout", async () => {
    await authService.logout()
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        reset: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(singUp.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(singUp.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.user = state.user ? state.user : action.payload;
        })
        .addCase(singUp.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.user = null;
        })
        .addCase(login.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.user = action.payload;
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.user = null;
        })
        .addCase(logout.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.user = null;
        })
    }
})

export const { reset } = authSlice.actions;
export default authSlice.reducer;