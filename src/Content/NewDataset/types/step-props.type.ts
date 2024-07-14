import { Dataset } from "../../../types/dataset.type";

export interface StepProps {
  dataset: Dataset | null;
  goToNextStep: () => void;
}
