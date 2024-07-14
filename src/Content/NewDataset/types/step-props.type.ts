import { Dataset } from "../../../types/dataset.type";
import { Image } from "../../../types/image.type";

export interface StepProps {
  dataset: Dataset | null;
  images: Image[];
  goToNextStep: () => void;
}
