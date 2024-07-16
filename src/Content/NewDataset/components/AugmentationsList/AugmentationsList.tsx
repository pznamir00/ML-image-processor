import { Timeline } from "antd";
import { Augmentation } from "../../../../types/augmentation.type";
import { AugmentationAlgorithmLabels } from "../../Augmentation/types/augmentation-algorithms.enum";
import styles from "./AugmentationsList.module.scss";

export default function AugmentationsList({
  augmentations,
}: {
  augmentations: Augmentation[];
}) {
  return (
    <Timeline>
      {augmentations.map((augmentation, key) => (
        <Timeline.Item key={key}>
          <div className={styles.item}>
            <span>{AugmentationAlgorithmLabels[augmentation.algorithm]}</span>
            <span className={styles.item__range}>
              {augmentation.fromPercentage * 100}% -{" "}
              {augmentation.toPercentage * 100}%
            </span>
          </div>
        </Timeline.Item>
      ))}
    </Timeline>
  );
}
