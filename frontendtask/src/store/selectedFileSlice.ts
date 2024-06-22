// src/store/selectedFileSlice.ts
"use client"

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedFileState {
    selectedFile: string | null;
}

const initialState: SelectedFileState = {
    selectedFile: null,
};

const selectedFileSlice = createSlice({
    name: 'selectedFile',
    initialState,
    reducers: {
        setSelectedFile: (state, action: PayloadAction<string>) => {
            state.selectedFile = action.payload;
        },
    },
});

export const { setSelectedFile } = selectedFileSlice.actions;

export default selectedFileSlice.reducer;
