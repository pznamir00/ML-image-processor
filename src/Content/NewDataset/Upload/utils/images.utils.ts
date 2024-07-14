import { Image } from "../../../../types/image.type";

export const getDistinctFiles = (images1: Image[], images2: Image[]) => {
  const allFiles = [...images1, ...images2];
  return allFiles.filter((file, index) => {
    return allFiles.findIndex((file2) => file.name === file2.name) === index;
  });
};

export const newFileToImage = (file: File): Image => ({
  name: file.name,
  url: null,
  isUploaded: false,
  datasetId: -1,
  file,
});

export const calculateProgress = (images: Image[]) => {
  const totalImagesNumber = images.length;
  const uploadedImagesNumber = images.filter((img) => img.isUploaded).length;
  return uploadedImagesNumber / totalImagesNumber;
};
