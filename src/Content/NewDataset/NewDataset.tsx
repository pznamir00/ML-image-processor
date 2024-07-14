import {
  CalculatorOutlined,
  EditOutlined,
  ExportOutlined,
  FormOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Steps } from "antd";
import { Content } from "antd/es/layout/layout";
import { Fragment, useState } from "react";
import Annotate from "./Annotate/Annotate";
import Preprocessing from "./Augmentation/Augmentation";
import Export from "./Export/Export";
import Form from "./Form/Form";
import { NewDatasetSteps } from "./types/new-dataset-steps.enum";
import Upload from "./Upload/Upload";

export default function NewDataset() {
  const [step, setStep] = useState(NewDatasetSteps.FORM);

  return (
    <Fragment>
      <Steps current={Object.values(NewDatasetSteps).indexOf(step)}>
        <Steps.Step icon={<FormOutlined />} title={NewDatasetSteps.FORM} />
        <Steps.Step icon={<UploadOutlined />} title={NewDatasetSteps.UPLOAD} />
        <Steps.Step
          icon={<EditOutlined />}
          title={NewDatasetSteps.ANNOTATION}
        />
        <Steps.Step
          icon={<CalculatorOutlined />}
          title={NewDatasetSteps.AUGMENTATION}
        />
        <Steps.Step icon={<ExportOutlined />} title={NewDatasetSteps.EXPORT} />
      </Steps>
      <Content>
        {(() => {
          switch (step) {
            case NewDatasetSteps.FORM:
              return <Form />;
            case NewDatasetSteps.UPLOAD:
              return <Upload />;
            case NewDatasetSteps.ANNOTATION:
              return <Annotate />;
            case NewDatasetSteps.AUGMENTATION:
              return <Preprocessing />;
            case NewDatasetSteps.EXPORT:
              return <Export />;
          }
        })()}
      </Content>
    </Fragment>
  );
}
