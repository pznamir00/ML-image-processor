export enum NewDatasetSteps {
  FORM = 1,
  UPLOAD,
  ANNOTATION,
  AUGMENTATION,
  OVERVIEW,
}

export const NewDatasetStepLabels = {
  [NewDatasetSteps.FORM]: "Form",
  [NewDatasetSteps.UPLOAD]: "Upload",
  [NewDatasetSteps.ANNOTATION]: "Annotation",
  [NewDatasetSteps.AUGMENTATION]: "Augmentation",
  [NewDatasetSteps.OVERVIEW]: "Overview",
};
