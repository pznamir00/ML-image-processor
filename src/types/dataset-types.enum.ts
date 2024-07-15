export enum DatasetTypes {
  OBJECT_DETECTION = "OBJECT_DETECTION",
  CLASSIFICATION = "CLASSIFICATION",
}

export const DatasetTypeLabels = {
  [DatasetTypes.CLASSIFICATION]: "Classification",
  [DatasetTypes.OBJECT_DETECTION]: "Object Detection",
};
