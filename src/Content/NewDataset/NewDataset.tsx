import {
  CalculatorOutlined,
  EditOutlined,
  FileDoneOutlined,
  FormOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Steps } from "antd";
import { Content } from "antd/es/layout/layout";
import { Fragment, useCallback, useState } from "react";
import { useNavigate } from "react-router";
import useStoreCleaningOnDestroy from "../../hooks/useStoreCleaningOnDestroy/useStoreCleaningOnDestroy";
import { selectCurrentDataset } from "../../store/datasets/selectors";
import { useAppSelector } from "../../store/hooks";
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
  useStoreCleaningOnDestroy();
  const [step, setStep] = useState(NewDatasetSteps.FORM);
  const dataset = useAppSelector(selectCurrentDataset);
  const images = useAppSelector(selectImages);
  const navigate = useNavigate();

  const goToNextStep = useCallback(() => {
    if (step === NewDatasetSteps.OVERVIEW) {
      return navigate("/datasets");
    }
    setStep(step + 1);
  }, [step, navigate]);

  return (
    <Fragment>
      <Steps
        current={step - 1}
        children={[
          { step: NewDatasetSteps.FORM, icon: <FormOutlined /> },
          { step: NewDatasetSteps.UPLOAD, icon: <UploadOutlined /> },
          { step: NewDatasetSteps.ANNOTATION, icon: <EditOutlined /> },
          { step: NewDatasetSteps.AUGMENTATION, icon: <CalculatorOutlined /> },
          { step: NewDatasetSteps.OVERVIEW, icon: <FileDoneOutlined /> },
        ].map(({ step, icon }, key) => (
          <Steps.Step
            key={key}
            icon={icon}
            title={NewDatasetStepLabels[step]}
          />
        ))}
      />
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
