import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Dataset } from "../../types/dataset.type";

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

export const createDataset = createAsyncThunk(
  "datasets/createDataset",
  async (dataset: Dataset) => {
    await axios.post<{ dataset: Dataset }>("http://localhost:8000/datasets", {
      dataset,
    });
    return dataset;
  },
);

export const datasetsSlice = createSlice({
  name: "datasets",
  initialState,
  reducers: {
    addOne: (state, action: PayloadAction<Dataset>) => {
      state.datasets.push(action.payload);
    },
    clear: (state) => {
      state.datasets = [];
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
      }),
});

export const datasetsActions = datasetsSlice.actions;
export default datasetsSlice.reducer;
