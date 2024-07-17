import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Image, Metadata } from "../../types/image.type";
import { updateBatchImages, uploadImage } from "./thunks";

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
    setMetadata: (
      state,
      action: PayloadAction<{
        image: Image;
        metadata: Metadata | null;
      }>,
    ) => {
      const { image, metadata } = action.payload;
      const index = state.images.findIndex((i) => i.name === image.name);
      state.images[index].metadata = metadata || undefined;
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
      })
      .addCase(updateBatchImages.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(updateBatchImages.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateBatchImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      }),
});

export const imagesActions = {
  ...imagesSlice.actions,
  updateBatchImages,
  uploadImage,
};

export default imagesSlice.reducer;
