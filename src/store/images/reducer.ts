import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Image } from "../../types/image.type";

export interface ImagesState {
  images: Image[];
  loading: boolean;
  error: string | null;
}

const initialState: ImagesState = {
  images: [],
  loading: false,
  error: null,
};

export const uploadImage = createAsyncThunk(
  "images/uploadImage",
  async ({ image, datasetId }: { image: Image; datasetId: number }) => {
    const result = await axios.post<{ image: Image }>(
      "http://localhost:8000/images",
      { image, datasetId },
    );
    return { ...result.data.image, file: image.file };
  },
);

export const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Image[]>) => {
      state.images = action.payload;
    },
    removeOne: (state, action: PayloadAction<Image>) => {
      state.images.splice(state.images.indexOf(action.payload), 1);
    },
    clear: (state) => {
      state.images = [];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(uploadImage.pending, (state) => {
        state.error = null;
      })
      .addCase(uploadImage.fulfilled, (state, action: PayloadAction<Image>) => {
        const image = action.payload;
        const index = state.images.findIndex((img) => img.name === image.name);
        state.images[index] = image;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      }),
});

export const imagesActions = imagesSlice.actions;
export default imagesSlice.reducer;
