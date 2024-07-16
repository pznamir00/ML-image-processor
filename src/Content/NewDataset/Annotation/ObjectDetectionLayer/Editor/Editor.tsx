import { AutoComplete, Button, Form } from "antd";
import { UIAnnotation } from "../types/ui-annotation.type";
import styles from "./Editor.module.scss";

export default function Editor({
  annotation,
  allClasses,
  onChange,
  onSubmit,
}: {
  annotation: UIAnnotation;
  allClasses: string[];
  onChange: (annotation: UIAnnotation) => void;
  onSubmit: () => void;
}) {
  const { geometry } = annotation;
  if (!geometry) {
    return null;
  }

  const update = (value: string) => {
    onChange({
      ...annotation,
      data: {
        ...annotation.data,
        text: value,
      },
    });
  };

  return (
    <Form
      className={styles.editor}
      style={{
        left: `${geometry.x}%`,
        top: `${geometry.y + geometry.height}%`,
      }}
    >
      <Form.Item label="Class">
        <AutoComplete
          onChange={update}
          onSelect={update}
          options={allClasses.map((value) => ({ value }))}
          style={{ width: 200 }}
        />
      </Form.Item>
      <Button onClick={onSubmit}>Save</Button>
    </Form>
  );
}
