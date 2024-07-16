import { Image } from "antd";
import {
  AugmentationAlgorithmImages,
  AugmentationAlgorithms,
} from "../types/augmentation-algorithms.enum";
import styles from "./AlgorithmImage.module.scss";

export default function AlgorithmImage({
  alg,
  isActive,
  onClick,
}: {
  alg: AugmentationAlgorithms;
  isActive: boolean;
  onClick: (algorithm: AugmentationAlgorithms) => void;
}) {
  return (
    <Image
      src={AugmentationAlgorithmImages[alg]}
      width={70}
      height={70}
      preview={false}
      className={`${styles.image} ${isActive ? styles.image__active : ""}`}
      onClick={() => onClick(alg)}
    />
  );
}
