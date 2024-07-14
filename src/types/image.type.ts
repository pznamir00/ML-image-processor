export interface Image<T> {
  name: string;
  url: string;
  metadata: T;
}

export type ClassificationImage = Image<{
  class: string;
}>;

export type ObjectDetectionImage = Image<{
  min: { x: number; y: number };
  max: { x: number; y: number };
}>;
