import {
  ClassificationImage,
  Image,
  ObjectDetectionImage,
} from "../types/image.type";

export const getImageUrl = (image: Image) =>
  URL.createObjectURL(image.file as File);

export const getClassesFromClassificationImage = (
  image: ClassificationImage,
) => [image.metadata?.class || ""];

export const getClassesFromObjectDetectionImage = (
  image: ObjectDetectionImage,
) => image.metadata?.annotations.map((ann) => ann.class) || [];
