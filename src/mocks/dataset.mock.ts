import { AugmentationAlgorithms } from "../Content/NewDataset/Augmentation/types/augmentation-algorithms.enum";
import { DatasetTypes } from "../types/dataset-types.enum";
import { Dataset } from "../types/dataset.type";

export const datasetMock: Dataset = {
  id: 5,
  name: "dataset-1",
  type: DatasetTypes.CLASSIFICATION,
  images: [],
  augmentations: [
    {
      fromPercentage: 0.1,
      toPercentage: 0.4,
      algorithm: AugmentationAlgorithms.CROP,
    },
  ],
};
