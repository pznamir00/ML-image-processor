import { Flex, Tooltip } from "antd";
import {
  AugmentationAlgorithmLabels,
  AugmentationAlgorithms,
} from "../types/augmentation-algorithms.enum";
import AlgorithmImage from "./AlgorithmImage/AlgorithmImage";

export default function AlgorithmsGrid() {
  return (
    <Flex wrap gap="small" data-testid="alg-grid">
      {[
        AugmentationAlgorithms.RANDOM_ROTATION,
        AugmentationAlgorithms.GRAYSCALE,
        AugmentationAlgorithms.NOISE,
        AugmentationAlgorithms.CROP,
        AugmentationAlgorithms.BLUR,
      ].map((alg, key) => (
        <Tooltip key={key} title={AugmentationAlgorithmLabels[alg]}>
          <div>
            <AlgorithmImage alg={alg} />
          </div>
        </Tooltip>
      ))}
    </Flex>
  );
}
