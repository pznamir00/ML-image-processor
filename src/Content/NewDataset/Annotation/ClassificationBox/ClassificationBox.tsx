import useDebounce from "@custom-react-hooks/use-debounce";
import { AutoComplete, Card, Form } from "antd";
import { memo, useEffect, useState } from "react";
import {
  ClassificationImage,
  ClassificationImageMetadata,
} from "../../../../types/image.type";
import styles from "./ClassificationBox.module.scss";
import useDistinctClasses from "./hooks/useDistinctClasses/useDistinctClasses";

function ClassificationBox({
  currentImage,
  images,
  setMetadata,
}: {
  currentImage: ClassificationImage;
  images: ClassificationImage[];
  setMetadata: (metadata: ClassificationImageMetadata | null) => void;
}) {
  const [_class, setClass] = useState(currentImage.metadata?.class || "");
  const allClasses = useDistinctClasses(images);
  const [updateMetadata] = useDebounce(
    (val: string) => setMetadata(val ? { class: val } : null),
    1000,
  );

  useEffect(() => {
    setClass(currentImage.metadata?.class || "");
  }, [currentImage]);

  const update = (value: string) => {
    setClass(value);
    updateMetadata(value);
  };

  return (
    <Card className={styles.classification_box}>
      <Form>
        <Form.Item label="Class">
          <AutoComplete
            value={_class}
            onChange={update}
            onSelect={update}
            options={allClasses.map((value) => ({ value }))}
            style={{ width: 200 }}
          />
        </Form.Item>
      </Form>
    </Card>
  );
}

export default memo(ClassificationBox);
