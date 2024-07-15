import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button, Card, Image, Progress } from "antd";
import { useState } from "react";
import { StepProps } from "../types/step-props.type";
import styles from "./Annotation.module.scss";

export default function Annotation({
  dataset,
  images,
  goToNextStep,
}: StepProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const onNextPhoto = () => setCurrentImageIndex(currentImageIndex + 1);

  const onPreviousPhoto = () => setCurrentImageIndex(currentImageIndex - 1);

  return (
    <Card
      className={styles.annotation}
      actions={[
        <Button
          type="text"
          onClick={onPreviousPhoto}
          disabled={currentImageIndex === 0}
        >
          <ArrowLeftOutlined />
        </Button>,
        <div className={styles.annotation__stats}>
          <span>
            {currentImageIndex + 1} / {images.length}
          </span>
          <Progress
            percent={(currentImageIndex / images.length) * 100}
            className={styles.annotation__stats__progress}
          />
        </div>,
        <Button
          type="text"
          onClick={onNextPhoto}
          disabled={currentImageIndex + 1 === images.length}
        >
          <ArrowRightOutlined />
        </Button>,
      ]}
    >
      <Image
        preview={false}
        src={URL.createObjectURL(images[currentImageIndex].file as File)}
      />
    </Card>
  );
}
