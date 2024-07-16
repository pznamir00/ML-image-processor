import { Button, Flex, Image } from "antd";
import Card from "antd/es/card/Card";
import { Content } from "antd/es/layout/layout";
import useDatasetAllClassesExtractor from "../../../hooks/useDatasetAllClassesExtractor/useDatasetAllClassesExtractor";
import { DatasetTypeLabels } from "../../../types/dataset-types.enum";
import AugmentationsList from "../components/AugmentationsList/AugmentationsList";
import { StepProps } from "../types/step-props.type";
import styles from "./Overview.module.scss";

export default function Overview({ goToNextStep, dataset, images }: StepProps) {
  const classesCount = useDatasetAllClassesExtractor(dataset);

  return (
    <Content>
      <Flex wrap gap="small">
        <Card className={styles.overview__tile}>
          <b>{dataset.name}</b>
          <p>{DatasetTypeLabels[dataset.type]}</p>
          <p>{classesCount} classes</p>
          <p>{images.length} images</p>
        </Card>
        <Card className={styles.overview__tile}>
          <Image
            width={200}
            height={200}
            src={URL.createObjectURL(images[0].file as File)}
          />
        </Card>
        <Card className={styles.overview__tile}>
          <AugmentationsList augmentations={dataset.augmentations} />
        </Card>
        <Card className={styles.overview__tile}>
          <Button onClick={goToNextStep}>Finish</Button>
        </Card>
      </Flex>
    </Content>
  );
}
