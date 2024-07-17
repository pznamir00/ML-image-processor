import { DatasetTypes } from "../../types/dataset-types.enum";
import { Dataset } from "../../types/dataset.type";
import {
  ClassificationImage,
  Image,
  ObjectDetectionImage,
} from "../../types/image.type";
import {
  getClassesFromClassificationImage,
  getClassesFromObjectDetectionImage,
} from "../../utils/images.utils";
import useDistinctClasses from "../useDistinctClasses/useDistinctClasses";

export default function useDatasetAllClassesExtractor(dataset: Dataset) {
  return useDistinctClasses(dataset.images as Image[], (img) =>
    dataset.type === DatasetTypes.CLASSIFICATION
      ? getClassesFromClassificationImage(img as ClassificationImage)
      : getClassesFromObjectDetectionImage(img as ObjectDetectionImage),
  ).length;
}
