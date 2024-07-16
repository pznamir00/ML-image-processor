import { Image } from "../../../../types/image.type";

export interface LayerProps<T extends Image> {
  currentImage: T;
  images: T[];
  setMetadata: (metadata: T["metadata"]) => void;
}
