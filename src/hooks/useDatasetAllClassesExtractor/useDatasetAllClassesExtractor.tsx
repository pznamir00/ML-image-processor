import { DatasetTypes } from "../../types/dataset-types.enum";
import { Dataset } from "../../types/dataset.type";
import {
  ClassificationImageMetadata,
  Image,
  ObjectDetectionImageMetadata,
} from "../../types/image.type";
import useDistinctClasses from "../useDistinctClasses/useDistinctClasses";

export default function useDatasetAllClassesExtractor(dataset: Dataset) {
  return useDistinctClasses(dataset.images as Image[], (img) =>
    dataset.type === DatasetTypes.CLASSIFICATION
      ? [(img.metadata as ClassificationImageMetadata).class]
      : (img.metadata as ObjectDetectionImageMetadata).annotations.map(
          (i) => i.class,
        ),
  ).length;
}
