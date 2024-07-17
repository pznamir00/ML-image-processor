import { createAsyncThunk } from "@reduxjs/toolkit";
import { Dataset } from "../../types/dataset.type";
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
  async (dataset: Dataset) => {
    await http.post<{ dataset: Dataset }>("/datasets/export", { dataset });
    return dataset;
  },
);
