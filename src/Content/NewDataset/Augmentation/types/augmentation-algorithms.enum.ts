export enum AugmentationAlgorithms {
  RANDOM_ROTATION = 1,
  GRAYSCALE,
  NOISE,
  BLUR,
  CROP,
}

export const AugmentationAlgorithmLabels = {
  [AugmentationAlgorithms.RANDOM_ROTATION]: "Random rotation",
  [AugmentationAlgorithms.GRAYSCALE]: "Grayscale",
  [AugmentationAlgorithms.NOISE]: "Noise",
  [AugmentationAlgorithms.BLUR]: "Blur",
  [AugmentationAlgorithms.CROP]: "Crop",
};

export const AugmentationAlgorithmImages = {
  [AugmentationAlgorithms.RANDOM_ROTATION]:
    "/augmentations/random_rotation.jpg",
  [AugmentationAlgorithms.GRAYSCALE]: "/augmentations/grayscale.jpg",
  [AugmentationAlgorithms.NOISE]: "/augmentations/noise.jpg",
  [AugmentationAlgorithms.BLUR]: "/augmentations/blur.jpg",
  [AugmentationAlgorithms.CROP]: "/augmentations/crop.jpg",
};
