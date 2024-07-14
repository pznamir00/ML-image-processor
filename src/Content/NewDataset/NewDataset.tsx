import {
  CalculatorOutlined,
  EditOutlined,
  ExportOutlined,
  FormOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Steps } from "antd";
import { Content } from "antd/es/layout/layout";
import { Fragment, useCallback, useState } from "react";
import { selectCurrentDataset } from "../../store/datasets/selectors";
import { useAppSelector } from "../../store/hooks";
import Annotate from "./Annotate/Annotate";
import Preprocessing from "./Augmentation/Augmentation";
import Export from "./Export/Export";
import Form from "./Form/Form";
import styles from "./NewDataset.module.scss";
import { NewDatasetSteps } from "./types/new-dataset-steps.enum";
import Upload from "./Upload/Upload";

export default function NewDataset() {
  const [step, setStep] = useState(NewDatasetSteps.FORM);
  const dataset = useAppSelector(selectCurrentDataset);

  const goToNextStep = useCallback(() => {
    setStep(step + 1);
  }, [step]);

  return (
    <Fragment>
      <Steps current={step - 1}>
        <Steps.Step icon={<FormOutlined />} title="Form" />
        <Steps.Step icon={<UploadOutlined />} title="Upload" />
        <Steps.Step icon={<EditOutlined />} title="Annotation" />
        <Steps.Step icon={<CalculatorOutlined />} title="Augmentation" />
        <Steps.Step icon={<ExportOutlined />} title="Export" />
      </Steps>
      <Content className={styles.new_dataset__content}>
        {(() => {
          switch (step) {
            case NewDatasetSteps.FORM:
              return <Form goToNextStep={goToNextStep} />;
            case NewDatasetSteps.UPLOAD:
              return <Upload goToNextStep={goToNextStep} dataset={dataset} />;
            case NewDatasetSteps.ANNOTATION:
              return <Annotate goToNextStep={goToNextStep} dataset={dataset} />;
            case NewDatasetSteps.AUGMENTATION:
              return (
                <Preprocessing goToNextStep={goToNextStep} dataset={dataset} />
              );
            case NewDatasetSteps.EXPORT:
              return <Export goToNextStep={goToNextStep} dataset={dataset} />;
          }
        })()}
      </Content>
    </Fragment>
  );
}
