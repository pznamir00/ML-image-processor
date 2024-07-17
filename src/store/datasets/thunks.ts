import { createAsyncThunk } from "@reduxjs/toolkit";
import { Dataset } from "../../types/dataset.type";
import { ExportFormats } from "../../types/export-formats.enum";
import { http } from "../http-client";

export const getDatasets = createAsyncThunk(
  "datasets/getDatasets",
  async () => {
    const response = await http.get<Dataset[]>("/datasets");
    return response.data;
  },
);

export const createDataset = createAsyncThunk(
  "datasets/createDataset",
  async (dataset: Dataset) => {
    await http.post<{ dataset: Dataset }>("/datasets", {
      dataset,
    });
    return dataset;
  },
);

export const updateDataset = createAsyncThunk(
  "datasets/updateDataset",
  async (dataset: Dataset) => {
    await http.put<{ dataset: Dataset }>("/datasets", {
      dataset,
    });
    return dataset;
  },
);

export const exportDataset = createAsyncThunk(
  "datasets/exportDataset",
  async ({ dataset, type }: { dataset: Dataset; type: ExportFormats }) => {
    await http.post<{ dataset: Dataset }>(`/datasets/export?format=${type}`, {
      dataset,
    });
    return dataset;
  },
);
