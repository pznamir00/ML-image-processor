import { Augmentation } from "./augmentation.type";
import { DatasetTypes } from "./dataset-types.enum";
import { ClassificationImage, Image, ObjectDetectionImage } from "./image.type";

interface BaseDataset {
  id: number;
  name: string;
  type: DatasetTypes;
  images: Image[];
  augmentations: Augmentation[];
}

export interface ClassificationDataset extends BaseDataset {
  type: DatasetTypes.CLASSIFICATION;
  images: ClassificationImage[];
}

export interface ObjectDetectionDataset extends BaseDataset {
  type: DatasetTypes.OBJECT_DETECTION;
  images: ObjectDetectionImage[];
}

export type Dataset = ClassificationDataset | ObjectDetectionDataset;
