export interface UIAnnotation {
  geometry: {
    width: number;
    height: number;
    x: number;
    y: number;
    type: string;
  };
  data: {
    text: string;
    id: number;
  };
}
