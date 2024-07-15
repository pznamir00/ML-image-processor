export enum NewDatasetSteps {
  FORM = 1,
  UPLOAD,
  ANNOTATION,
  AUGMENTATION,
  EXPORT,
}

export const NewDatasetStepLabels = {
  [NewDatasetSteps.FORM]: "Form",
  [NewDatasetSteps.UPLOAD]: "Upload",
  [NewDatasetSteps.ANNOTATION]: "Annotation",
  [NewDatasetSteps.AUGMENTATION]: "Augmentation",
  [NewDatasetSteps.EXPORT]: "Export",
};
