import { AugmentationAlgorithms } from "../Content/NewDataset/Augmentation/types/augmentation-algorithms.enum";

export interface Augmentation {
  algorithm: AugmentationAlgorithms;
  fromPercentage: number;
  toPercentage: number;
}
