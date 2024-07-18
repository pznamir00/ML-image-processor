import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import { memo } from "react";
import { UIAnnotation } from "../types/ui-annotation.type";
import styles from "./BoxContent.module.scss";

function BoxContent({
  annotation,
  onDelete,
}: {
  annotation: UIAnnotation;
  onDelete: (annotation: UIAnnotation) => void;
}) {
  const { geometry } = annotation;

  return (
    <Card
      key={annotation.data.id}
      className={styles.box_content}
      style={{
        left: `${geometry.x}%`,
        top: `${geometry.y + geometry.height}%`,
      }}
      title={annotation.data.text}
      size="small"
      data-testid="box-content"
    >
      <Button danger onClick={() => onDelete(annotation)}>
        <DeleteOutlined />
      </Button>
    </Card>
  );
}

export default memo(BoxContent);
