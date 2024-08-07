'use client';

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../src/slices/authSlice";

export const store = configureStore({
    reducer:{
        auth: authReducer
    }
})