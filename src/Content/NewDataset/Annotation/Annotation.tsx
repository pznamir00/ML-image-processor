import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button, Card, Modal, Progress, Spin } from "antd";
import useNotification from "antd/es/notification/useNotification";
import { useCallback, useEffect, useMemo, useState } from "react";
import { datasetsActions } from "../../../store/datasets/reducer";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  imagesActions,
  updateBatchImages,
} from "../../../store/images/reducer";
import {
  selectImagesError,
  selectImagesLoading,
} from "../../../store/images/selectors";
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
  const [isConfirmationBoxOpen, setIsConfirmationBoxOpen] = useState(false);
  const [notificationApi, notificationHolder] = useNotification();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectImagesLoading);
  const error = useAppSelector(selectImagesError);
  const image = useMemo(
    () => images[currentImageIndex],
    [currentImageIndex, images],
  );

  useEffect(() => {
    if (error) {
      notificationApi.error({
        message: "Failed to save annotations",
        placement: "bottomRight",
        duration: 3,
      });
    }
  }, [error, notificationApi]);

  const isLastPhoto = currentImageIndex + 1 === images.length;

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

  const onNextItem = () => {
    if (isLastPhoto) {
      setIsConfirmationBoxOpen(true);
    } else {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const onPreviousItem = () => setCurrentImageIndex(currentImageIndex - 1);

  const onFinish = () => {
    dispatch(datasetsActions.setImages(images));
    dispatch(updateBatchImages({ images })).then(goToNextStep);
  };

  return (
    <Card
      className={styles.annotation}
      actions={[
        <Button
          type="text"
          onClick={onPreviousItem}
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
        <Button type="text" onClick={onNextItem} disabled={!image.metadata}>
          {isLastPhoto ? (
            loading ? (
              <Spin />
            ) : (
              <span>Next</span>
            )
          ) : (
            <ArrowRightOutlined />
          )}
        </Button>,
      ]}
    >
      {notificationHolder}
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
      <Modal
        title="Are you sure you want to finish annotating?"
        open={isConfirmationBoxOpen}
        onOk={onFinish}
        onCancel={() => setIsConfirmationBoxOpen(false)}
      ></Modal>
    </Card>
  );
}
