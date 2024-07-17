import { Button, Modal, Slider, Spin } from "antd";
import Card from "antd/es/card/Card";
import { Content } from "antd/es/layout/layout";
import { useContext, useState } from "react";
import useDatasetAllClassesExtractor from "../../../hooks/useDatasetAllClassesExtractor/useDatasetAllClassesExtractor";
import useToastOnError from "../../../hooks/useToastOnError/useToastOnError";
import { datasetsActions } from "../../../store/datasets/reducer";
import {
  selectDatasetsError,
  selectDatasetsLoading,
} from "../../../store/datasets/selectors";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Augmentation as IAugmentation } from "../../../types/augmentation.type";
import AugmentationsList from "../components/AugmentationsList/AugmentationsList";
import { StepProps } from "../types/step-props.type";
import AlgorithmsGrid from "./AlgorithmsGrid/AlgorithmsGrid";
import styles from "./Augmentation.module.scss";
import CurrentAlgorithmProvider, {
  CurrentAlgorithmContext,
} from "./CurrentAlgorithm/CurrentAlgorithm";
import { AugmentationAlgorithmLabels } from "./types/augmentation-algorithms.enum";

function AugmentationContent({ goToNextStep, images, dataset }: StepProps) {
  const [isConfirmationBoxOpen, setIsConfirmationBoxOpen] = useState(false);
  const [range, setRange] = useState<[number, number]>([0, 25]);
  const context = useContext(CurrentAlgorithmContext);
  const [augmentations, setAugmentations] = useState<IAugmentation[]>([]);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectDatasetsLoading);
  const err = useAppSelector(selectDatasetsError);
  const allClassesNum = useDatasetAllClassesExtractor(dataset);
  const notificationHolder = useToastOnError(err, "Failed to save annotations");

  const addAugmentation = () => {
    if (context?.algorithm) {
      const newAugmentation: IAugmentation = {
        algorithm: context.algorithm,
        fromPercentage: +(range[0] / 100).toFixed(2),
        toPercentage: +(range[1] / 100).toFixed(2),
      };
      setAugmentations([...augmentations, newAugmentation]);
      context.toggleAlgorithm(null);
      setRange([0, 25]);
    }
  };

  const onClear = () => {
    if (context) {
      setAugmentations([]);
      setRange([0, 25]);
      context.toggleAlgorithm(null);
    }
  };

  const onFinish = () => {
    dispatch(datasetsActions.updateDataset({ ...dataset, augmentations })).then(
      goToNextStep,
    );
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
                <AlgorithmsGrid />
              </Card>
              <Card
                actions={[
                  <Button
                    onClick={addAugmentation}
                    disabled={!context?.algorithm}
                  >
                    Add
                  </Button>,
                ]}
              >
                <div className={styles.augmentation__slider_label}>
                  {context?.algorithm && (
                    <span>
                      {AugmentationAlgorithmLabels[context.algorithm]}
                    </span>
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

export default function Augmentation(props: any) {
  return (
    <CurrentAlgorithmProvider>
      <AugmentationContent {...props} />
    </CurrentAlgorithmProvider>
  );
}
