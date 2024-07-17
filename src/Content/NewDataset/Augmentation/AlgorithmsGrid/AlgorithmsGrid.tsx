import { Flex, Tooltip } from "antd";
import AlgorithmImage from "../AlgorithmImage/AlgorithmImage";
import {
  AugmentationAlgorithmLabels,
  AugmentationAlgorithms,
} from "../types/augmentation-algorithms.enum";

export default function AlgorithmsGrid({
  algorithm,
  onImageClick,
}: {
  algorithm: AugmentationAlgorithms | null;
  onImageClick: (alg: AugmentationAlgorithms) => void;
}) {
  return (
    <Flex wrap gap="small">
      {[
        AugmentationAlgorithms.RANDOM_ROTATION,
        AugmentationAlgorithms.GRAYSCALE,
        AugmentationAlgorithms.NOISE,
        AugmentationAlgorithms.CROP,
        AugmentationAlgorithms.BLUR,
      ].map((alg, key) => (
        <Tooltip key={key} title={AugmentationAlgorithmLabels[alg]}>
          <div>
            <AlgorithmImage
              alg={alg}
              isActive={alg === algorithm}
              onClick={onImageClick}
            />
          </div>
        </Tooltip>
      ))}
    </Flex>
  );
}
