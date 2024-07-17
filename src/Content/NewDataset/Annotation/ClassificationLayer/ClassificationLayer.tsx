import useDebounce from "@custom-react-hooks/use-debounce";
import { AutoComplete, Card, Form, Image } from "antd";
import { memo, useEffect, useState } from "react";
import useDistinctClasses from "../../../../hooks/useDistinctClasses/useDistinctClasses";
import { ClassificationImage } from "../../../../types/image.type";
import {
  getClassesFromClassificationImage as getClassesFromImage,
  getImageUrl,
} from "../../../../utils/images.utils";
import { LayerProps } from "../types/layer-props.type";
import styles from "./ClassificationLayer.module.scss";

function ClassificationLayer({
  currentImage,
  images,
  setMetadata,
}: LayerProps<ClassificationImage>) {
  const [_class, setClass] = useState(currentImage.metadata?.class || "");
  const allClasses = useDistinctClasses(images, getClassesFromImage);
  const [updateMetadata] = useDebounce(
    (val: string) => setMetadata(val ? { class: val } : undefined),
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
    <Card className={styles.classification_layer}>
      <Image src={getImageUrl(currentImage)} width={300} height={300} />
      <Form className={styles.classification_layer__form}>
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

export default memo(ClassificationLayer);
