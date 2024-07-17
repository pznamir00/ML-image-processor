import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Dataset } from "../../types/dataset.type";
import {
  ClassificationImage,
  Image,
  ObjectDetectionImage,
} from "../../types/image.type";
import {
  createDataset,
  exportDataset,
  getDatasets,
  updateDataset,
} from "./thunks";

export interface DatasetsState {
  datasets: Dataset[];
  currentDataset: Dataset | null;
  loading: boolean;
  error: string | null;
}

const initialState: DatasetsState = {
  datasets: [],
  currentDataset: null,
  loading: false,
  error: null,
};

export const datasetsSlice = createSlice({
  name: "datasets",
  initialState,
  reducers: {
    addOne: (state, action: PayloadAction<Dataset>) => {
      state.datasets.push(action.payload);
    },
    setImages: (state, action: PayloadAction<Image[]>) => {
      if (state.currentDataset) {
        state.currentDataset.images = action.payload as
          | ClassificationImage[]
          | ObjectDetectionImage[];
      }
    },
    clear: (state) => {
      state.datasets = [];
      state.currentDataset = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(createDataset.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentDataset = null;
      })
      .addCase(
        createDataset.fulfilled,
        (state, action: PayloadAction<Dataset>) => {
          state.loading = false;
          state.datasets.push(action.payload);
          state.currentDataset = action.payload;
        },
      )
      .addCase(createDataset.rejected, (state, action) => {
        state.loading = false;
        state.currentDataset = null;
        state.error = action.error.message || "Error";
      })
      .addCase(updateDataset.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateDataset.fulfilled,
        (state, action: PayloadAction<Dataset>) => {
          state.loading = false;
          state.currentDataset = action.payload;
        },
      )
      .addCase(updateDataset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      })
      .addCase(getDatasets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getDatasets.fulfilled,
        (state, action: PayloadAction<Dataset[]>) => {
          state.loading = false;
          state.datasets = action.payload;
        },
      )
      .addCase(getDatasets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      })
      .addCase(exportDataset.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(exportDataset.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(exportDataset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      }),
});

export const datasetsActions = {
  ...datasetsSlice.actions,
  createDataset,
  exportDataset,
  getDatasets,
  updateDataset,
};

export default datasetsSlice.reducer;
