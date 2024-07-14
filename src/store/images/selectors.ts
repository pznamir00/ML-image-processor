import { RootState } from "../store";

export const selectImages = (state: RootState) => state.images.images;

export const selectImagesLoading = (state: RootState) => state.images.loading;

export const selectImagesError = (state: RootState) => state.images.error;
