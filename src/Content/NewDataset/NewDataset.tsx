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
import { useNavigate } from "react-router";
import { datasetsActions } from "../../store/datasets/reducer";
import { selectCurrentDataset } from "../../store/datasets/selectors";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { imagesActions } from "../../store/images/reducer";
import { selectImages } from "../../store/images/selectors";
import Annotate from "./Annotation/Annotation";
import Augmentation from "./Augmentation/Augmentation";
import Form from "./Form/Form";
import styles from "./NewDataset.module.scss";
import Overview from "./Overview/Overview";
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
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(imagesActions.clear());
    dispatch(datasetsActions.clear());
  }, [dispatch]);

  const goToNextStep = useCallback(() => {
    if (step === NewDatasetSteps.OVERVIEW) {
      return navigate("/datasets");
    }
    setStep(step + 1);
  }, [step, navigate]);

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
          title={NewDatasetStepLabels[NewDatasetSteps.OVERVIEW]}
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
              case NewDatasetSteps.OVERVIEW:
                return (
                  <Overview
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
