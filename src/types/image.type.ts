interface BaseImage<T> {
  name: string;
  url: string | null;
  isUploaded: boolean;
  datasetId: number;
  metadata?: T;
  file?: File;
}

export interface MetadataAnnotation {
  min: { x: number; y: number };
  max: { x: number; y: number };
  class: string;
}

export interface ClassificationImageMetadata {
  class: string;
}

export interface ObjectDetectionImageMetadata {
  annotations: MetadataAnnotation[];
}

export type Metadata =
  | ClassificationImageMetadata
  | ObjectDetectionImageMetadata;

export type ClassificationImage = BaseImage<ClassificationImageMetadata>;

export type ObjectDetectionImage = BaseImage<ObjectDetectionImageMetadata>;

export type Image = ClassificationImage | ObjectDetectionImage;
