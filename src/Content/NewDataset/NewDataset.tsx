import {
  CalculatorOutlined,
  EditOutlined,
  ExportOutlined,
  FormOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Steps } from "antd";
import { Content } from "antd/es/layout/layout";
import { Fragment, useCallback, useEffect, useState } from "react";
import { datasetsActions } from "../../store/datasets/reducer";
import { selectCurrentDataset } from "../../store/datasets/selectors";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { imagesActions } from "../../store/images/reducer";
import { selectImages } from "../../store/images/selectors";
import Annotate from "./Annotation/Annotation";
import Augmentation from "./Augmentation/Augmentation";
import Export from "./Export/Export";
import Form from "./Form/Form";
import styles from "./NewDataset.module.scss";
import {
  NewDatasetStepLabels,
  NewDatasetSteps,
} from "./types/new-dataset-steps.enum";
import Upload from "./Upload/Upload";

export default function NewDataset() {
  const [step, setStep] = useState(NewDatasetSteps.FORM);
  const dispatch = useAppDispatch();
  const dataset = useAppSelector(selectCurrentDataset);
  const images = useAppSelector(selectImages);

  useEffect(() => {
    dispatch(imagesActions.clear());
    dispatch(datasetsActions.clear());
  }, [dispatch]);

  const goToNextStep = useCallback(() => {
    setStep(step + 1);
  }, [step]);

  return (
    <Fragment>
      <Steps current={step - 1}>
        <Steps.Step
          icon={<FormOutlined />}
          title={NewDatasetStepLabels[NewDatasetSteps.FORM]}
        />
        <Steps.Step
          icon={<UploadOutlined />}
          title={NewDatasetStepLabels[NewDatasetSteps.UPLOAD]}
        />
        <Steps.Step
          icon={<EditOutlined />}
          title={NewDatasetStepLabels[NewDatasetSteps.ANNOTATION]}
        />
        <Steps.Step
          icon={<CalculatorOutlined />}
          title={NewDatasetStepLabels[NewDatasetSteps.AUGMENTATION]}
        />
        <Steps.Step
          icon={<ExportOutlined />}
          title={NewDatasetStepLabels[NewDatasetSteps.EXPORT]}
        />
      </Steps>
      <Content className={styles.new_dataset__content}>
        {(() => {
          if (step === NewDatasetSteps.FORM) {
            return <Form goToNextStep={goToNextStep} />;
          }
          if (dataset) {
            switch (step) {
              case NewDatasetSteps.UPLOAD:
                return (
                  <Upload
                    goToNextStep={goToNextStep}
                    dataset={dataset}
                    images={images}
                  />
                );
              case NewDatasetSteps.ANNOTATION:
                return (
                  <Annotate
                    goToNextStep={goToNextStep}
                    dataset={dataset}
                    images={images}
                  />
                );
              case NewDatasetSteps.AUGMENTATION:
                return (
                  <Augmentation
                    goToNextStep={goToNextStep}
                    dataset={dataset}
                    images={images}
                  />
                );
              case NewDatasetSteps.EXPORT:
                return (
                  <Export
                    goToNextStep={goToNextStep}
                    dataset={dataset}
                    images={images}
                  />
                );
            }
          }
        })()}
      </Content>
    </Fragment>
  );
}
