import { Form as AntdForm, Button, Card, Input, Radio } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import useToastOnError from "../../../hooks/useToastOnError/useToastOnError";
import { datasetsActions } from "../../../store/datasets/reducer";
import {
  selectCurrentDataset,
  selectDatasetsError,
  selectDatasetsLoading,
} from "../../../store/datasets/selectors";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { DatasetTypes } from "../../../types/dataset-types.enum";
import { Dataset } from "../../../types/dataset.type";
import { StepProps } from "../types/step-props.type";
import styles from "./Form.module.scss";

export default function Form({
  goToNextStep,
}: Omit<StepProps, "dataset" | "images">) {
  const [form] = useForm<Omit<Dataset, "images">>();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectDatasetsLoading);
  const err = useAppSelector(selectDatasetsError);
  const dataset = useAppSelector(selectCurrentDataset);
  const notifHolder = useToastOnError(err, "Failed to create the dataset");

  useEffect(() => {
    if (dataset) {
      goToNextStep();
    }
  }, [dataset, goToNextStep]);

  const submit = async () => {
    dispatch(
      datasetsActions.createDataset({ ...form.getFieldsValue(), images: [] }),
    );
  };

  return (
    <Card title="Add New Dataset" className={styles.form} loading={loading}>
      {notifHolder}
      <AntdForm
        form={form}
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 10 }}
        onFinish={submit}
      >
        <AntdForm.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please provide the dataset's name",
            },
          ]}
        >
          <Input data-testid="name-input" />
        </AntdForm.Item>

        <AntdForm.Item
          label="Type"
          name="type"
          rules={[
            {
              required: true,
              message: "Please provide the dataset's type",
            },
          ]}
        >
          <Radio.Group>
            <Radio.Button value={DatasetTypes.OBJECT_DETECTION}>
              Object Detection
            </Radio.Button>
            <Radio.Button value={DatasetTypes.CLASSIFICATION}>
              Classification
            </Radio.Button>
          </Radio.Group>
        </AntdForm.Item>

        <AntdForm.Item className={styles.form__submit_btn}>
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </AntdForm.Item>
      </AntdForm>
    </Card>
  );
}
