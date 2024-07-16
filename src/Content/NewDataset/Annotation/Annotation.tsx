import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button, Card, Progress } from "antd";
import { useCallback, useMemo, useState } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { imagesActions } from "../../../store/images/reducer";
import { DatasetTypes } from "../../../types/dataset-types.enum";
import {
  ClassificationImage,
  Metadata,
  ObjectDetectionImage,
} from "../../../types/image.type";
import { StepProps } from "../types/step-props.type";
import styles from "./Annotation.module.scss";
import ClassificationLayer from "./ClassificationLayer/ClassificationLayer";
import ObjectDetectionLayer from "./ObjectDetectionLayer/ObjectDetectionLayer";

export default function Annotation({
  dataset,
  images,
  goToNextStep,
}: StepProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const dispatch = useAppDispatch();

  const image = useMemo(
    () => images[currentImageIndex],
    [currentImageIndex, images],
  );

  const onNextPhoto = () => setCurrentImageIndex(currentImageIndex + 1);

  const onPreviousPhoto = () => setCurrentImageIndex(currentImageIndex - 1);

  const setMetadata = useCallback(
    (metadata: Metadata | undefined) => {
      dispatch(
        imagesActions.setMetadata({
          image,
          metadata: metadata || null,
        }),
      );
    },
    [dispatch, image],
  );

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
            percent={+((currentImageIndex / images.length) * 100).toFixed(2)}
            className={styles.annotation__stats__progress}
          />
        </div>,
        <Button
          type="text"
          onClick={onNextPhoto}
          disabled={currentImageIndex + 1 === images.length || !image.metadata}
        >
          <ArrowRightOutlined />
        </Button>,
      ]}
    >
      {dataset.type === DatasetTypes.CLASSIFICATION ? (
        <ClassificationLayer
          currentImage={image as ClassificationImage}
          images={images as ClassificationImage[]}
          setMetadata={setMetadata}
        />
      ) : (
        <ObjectDetectionLayer
          currentImage={image as ObjectDetectionImage}
          images={images as ObjectDetectionImage[]}
          setMetadata={setMetadata}
        />
      )}
      {/* <Image
        preview={false}
        width={450}
        height={450}
        className={styles.annotation__image}
        src={URL.createObjectURL(images[currentImageIndex].file as File)}
      /> */}
    </Card>
  );
}
