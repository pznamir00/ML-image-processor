interface BaseImage<T> {
  name: string;
  url: string | null;
  isUploaded: boolean;
  datasetId: number;
  metadata?: T;
  file?: File;
}

export type ClassificationImage = BaseImage<{
  class: string;
}>;

export type ObjectDetectionImage = BaseImage<{
  min: { x: number; y: number };
  max: { x: number; y: number };
}>;

export type Image = ClassificationImage | ObjectDetectionImage;
