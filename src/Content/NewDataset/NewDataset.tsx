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
import Annotate from "./Annotate/Annotate";
import Preprocessing from "./Augmentation/Augmentation";
import Export from "./Export/Export";
import Form from "./Form/Form";
import { NewDatasetSteps } from "./types/new-dataset-steps.enum";
import Upload from "./Upload/Upload";

export default function NewDataset() {
  const [step, setStep] = useState(NewDatasetSteps.FORM);

  const goToNextStep = useCallback(() => {
    //
  }, []);

  return (
    <Fragment>
      <Steps current={Object.values(NewDatasetSteps).indexOf(step)}>
        <Steps.Step icon={<FormOutlined />} title="Form" />
        <Steps.Step icon={<UploadOutlined />} title="Upload" />
        <Steps.Step icon={<EditOutlined />} title="Annotation" />
        <Steps.Step icon={<CalculatorOutlined />} title="Augmentation" />
        <Steps.Step icon={<ExportOutlined />} title="Export" />
      </Steps>
      <Content>
        {(() => {
          switch (step) {
            case NewDatasetSteps.FORM:
              return <Form goToNextStep={goToNextStep} />;
            case NewDatasetSteps.UPLOAD:
              return <Upload goToNextStep={goToNextStep} />;
            case NewDatasetSteps.ANNOTATION:
              return <Annotate goToNextStep={goToNextStep} />;
            case NewDatasetSteps.AUGMENTATION:
              return <Preprocessing goToNextStep={goToNextStep} />;
            case NewDatasetSteps.EXPORT:
              return <Export goToNextStep={goToNextStep} />;
          }
        })()}
      </Content>
    </Fragment>
  );
}
