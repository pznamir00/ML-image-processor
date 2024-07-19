import { Image } from "antd";
import { useContext } from "react";
import { CurrentAlgorithmContext } from "../../CurrentAlgorithm/CurrentAlgorithm";
import {
  AugmentationAlgorithmImages,
  AugmentationAlgorithms,
} from "../../types/augmentation-algorithms.enum";
import styles from "./AlgorithmImage.module.scss";

export default function AlgorithmImage({
  alg,
}: {
  alg: AugmentationAlgorithms;
}) {
  const context = useContext(CurrentAlgorithmContext);

  return (
    <Image
      data-testid={`algorithm-image-${alg}`}
      src={AugmentationAlgorithmImages[alg]}
      width={70}
      height={70}
      preview={false}
      className={`${styles.image} ${context?.algorithm === alg ? styles.image__active : ""}`}
      onClick={() => context?.toggleAlgorithm(alg)}
    />
  );
}
