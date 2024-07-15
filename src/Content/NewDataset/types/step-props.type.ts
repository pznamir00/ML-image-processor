import { Dataset } from "../../../types/dataset.type";
import { Image } from "../../../types/image.type";

export interface StepProps {
  dataset: Dataset;
  images: Image[];
  goToNextStep: () => void;
}
