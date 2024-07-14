import { Form as AntdForm, Button, Card, Input, Radio } from "antd";
import { useForm } from "antd/es/form/Form";
import useNotification from "antd/es/notification/useNotification";
import { useEffect } from "react";
import { createDataset } from "../../../store/datasets/reducer";
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

export default function Form({ goToNextStep }: Omit<StepProps, "dataset">) {
  const [form] = useForm<Omit<Dataset, "images">>();
  const dispatch = useAppDispatch();
  const [notificationApi, notificationHolder] = useNotification();
  const loading = useAppSelector(selectDatasetsLoading);
  const error = useAppSelector(selectDatasetsError);
  const dataset = useAppSelector(selectCurrentDataset);

  useEffect(() => {
    if (dataset) {
      goToNextStep();
    }
  }, [dataset, goToNextStep]);

  useEffect(() => {
    if (error) {
      notificationApi.error({
        message: "Failed to create the dataset",
        placement: "bottomRight",
        duration: 3,
      });
    }
  }, [error, notificationApi]);

  const submit = async () => {
    dispatch(
      createDataset({
        ...form.getFieldsValue(),
        images: [],
      }),
    );
  };

  return (
    <Card title="Add New Dataset" className={styles.form} loading={loading}>
      {notificationHolder}
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
          <Input />
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
            Submit
          </Button>
        </AntdForm.Item>
      </AntdForm>
    </Card>
  );
}
