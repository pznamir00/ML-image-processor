import { RootState } from "../store";

export const selectDatasets = (state: RootState) => state.datasets.datasets;

export const selectCurrentDataset = (state: RootState) =>
  state.datasets.currentDataset;

export const selectDatasetsLoading = (state: RootState) =>
  state.datasets.loading;

export const selectDatasetsError = (state: RootState) => state.datasets.error;
