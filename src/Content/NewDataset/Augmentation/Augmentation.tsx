import { Button, Flex, Modal, Slider, Spin, Tooltip } from "antd";
import Card from "antd/es/card/Card";
import { Content } from "antd/es/layout/layout";
import useNotification from "antd/es/notification/useNotification";
import { useCallback, useEffect, useState } from "react";
import useDatasetAllClassesExtractor from "../../../hooks/useDatasetAllClassesExtractor/useDatasetAllClassesExtractor";
import { updateDataset } from "../../../store/datasets/reducer";
import {
  selectDatasetsError,
  selectDatasetsLoading,
} from "../../../store/datasets/selectors";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Augmentation as IAugmentation } from "../../../types/augmentation.type";
import AugmentationsList from "../components/AugmentationsList/AugmentationsList";
import { StepProps } from "../types/step-props.type";
import AlgorithmImage from "./AlgorithmImage/AlgorithmImage";
import styles from "./Augmentation.module.scss";
import {
  AugmentationAlgorithms as Algorithms,
  AugmentationAlgorithmLabels,
} from "./types/augmentation-algorithms.enum";

export default function Augmentation({
  goToNextStep,
  images,
  dataset,
}: StepProps) {
  const [isConfirmationBoxOpen, setIsConfirmationBoxOpen] = useState(false);
  const [algorithm, setAlgorithm] = useState<Algorithms | null>(null);
  const [range, setRange] = useState<[number, number]>([0, 25]);
  const [augmentations, setAugmentations] = useState<IAugmentation[]>([]);
  const [notificationApi, notificationHolder] = useNotification();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectDatasetsLoading);
  const error = useAppSelector(selectDatasetsError);
  const allClassesNum = useDatasetAllClassesExtractor(dataset);

  useEffect(() => {
    if (error) {
      notificationApi.error({
        message: "Failed to save annotations",
        placement: "bottomRight",
        duration: 3,
      });
    }
  }, [error, notificationApi]);

  const onImageClick = useCallback(
    (alg: Algorithms) => setAlgorithm(alg === algorithm ? null : alg),
    [setAlgorithm, algorithm],
  );

  const addAugmentation = () => {
    if (algorithm) {
      const newAugmentation: IAugmentation = {
        algorithm,
        fromPercentage: +(range[0] / 100).toFixed(2),
        toPercentage: +(range[1] / 100).toFixed(2),
      };
      setAugmentations([...augmentations, newAugmentation]);
      setAlgorithm(null);
      setRange([0, 25]);
    }
  };

  const onClear = () => {
    setAugmentations([]);
    setRange([0, 25]);
    setAlgorithm(null);
  };

  const onFinish = () => {
    dispatch(updateDataset({ ...dataset, augmentations })).then(goToNextStep);
  };

  return (
    <Content>
      {notificationHolder}
      <Card
        title={
          <div className={styles.augmentation__header}>
            <span>Augmentation</span>
            <span>
              {images.length} images | {allClassesNum} classes
            </span>
          </div>
        }
        actions={[
          <Button onClick={onClear} type="text">
            Clear
          </Button>,
          <Button onClick={() => setIsConfirmationBoxOpen(true)}>Next</Button>,
        ]}
        className={styles.augmentation}
      >
        {loading ? (
          <Spin />
        ) : (
          <div className={styles.augmentation__body}>
            <div className={styles.augmentation__column}>
              <Card>
                <Flex wrap gap="small">
                  {[
                    Algorithms.RANDOM_ROTATION,
                    Algorithms.GRAYSCALE,
                    Algorithms.NOISE,
                    Algorithms.CROP,
                    Algorithms.BLUR,
                  ].map((alg) => (
                    <Tooltip title={AugmentationAlgorithmLabels[alg]}>
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
              </Card>
              <Card
                actions={[
                  <Button onClick={addAugmentation} disabled={!algorithm}>
                    Add
                  </Button>,
                ]}
              >
                <div className={styles.augmentation__slider_label}>
                  {algorithm && (
                    <span>{AugmentationAlgorithmLabels[algorithm]}</span>
                  )}
                </div>
                <Slider
                  range
                  value={range}
                  tooltip={{ open: true }}
                  onChange={([val1, val2]) => setRange([val1, val2])}
                />
              </Card>
            </div>
            <div className={styles.augmentation__column}>
              <Card title="Overview" className={styles.augmentation__overview}>
                <AugmentationsList augmentations={augmentations} />
              </Card>
            </div>
          </div>
        )}
      </Card>
      <Modal
        title="Are you sure you want to finish applying augmentations?"
        open={isConfirmationBoxOpen}
        onOk={onFinish}
        onCancel={() => setIsConfirmationBoxOpen(false)}
      ></Modal>
    </Content>
  );
}
