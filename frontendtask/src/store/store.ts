// src/store/store.ts

"use client"
import { configureStore } from '@reduxjs/toolkit';
import selectedFileReducer from './selectedFileSlice';

const store = configureStore({
    reducer: {
        selectedFile: selectedFileReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
