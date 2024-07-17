import { createAsyncThunk } from "@reduxjs/toolkit";
import { Image } from "../../types/image.type";
import { http } from "../http-client";

export const uploadImage = createAsyncThunk(
  "images/uploadImage",
  async ({ image, datasetId }: { image: Image; datasetId: number }) => {
    const result = await http.post<{ image: Image }>("/images", {
      image,
      datasetId,
    });
    return { ...result.data.image, file: image.file };
  },
);

export const updateBatchImages = createAsyncThunk(
  "images/updateBatchImages",
  async ({ images }: { images: Image[] }) => {
    return await http.put("/images/batch", { images });
  },
);
