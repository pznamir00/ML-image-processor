import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface ImagesState {
  value: File[];
}

const initialState: ImagesState = {
  value: [],
};

export const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<File[]>) => {
      state.value = action.payload;
    },
    removeOne: (state, action: PayloadAction<File>) => {
      state.value.splice(state.value.indexOf(action.payload), 1);
    },
    clear: (state) => {
      state.value = [];
    },
  },
});

export const imagesActions = imagesSlice.actions;
export default imagesSlice.reducer;
