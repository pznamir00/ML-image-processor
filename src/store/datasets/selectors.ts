import { RootState } from "../store";

export const selectDatasets = (state: RootState) => state.datasets.value;

export const selectDatasetsLoading = (state: RootState) =>
  state.datasets.loading;

export const selectDatasetsError = (state: RootState) => state.datasets.error;
