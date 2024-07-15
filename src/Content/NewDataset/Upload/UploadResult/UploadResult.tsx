import { DeleteOutlined } from "@ant-design/icons";
import { Image as AntdImage, Button } from "antd";
import { useRef } from "react";
import useRefWidth from "../../../../hooks/useRefWidth/useRefWidth";
import { Image } from "../../../../types/image.type";
import styles from "./UploadResult.module.scss";

interface Props {
  images: Image[];
  onDelete: (image: Image) => void;
  uploading: boolean;
}

export default function UploadResult({ images, onDelete, uploading }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const containerWidth = useRefWidth(containerRef);

  return (
    <div className={styles.upload_result} ref={containerRef}>
      <AntdImage.PreviewGroup>
        {images.map((image, key) => (
          <div key={key} className={styles.upload_result__item}>
            <AntdImage
              width={containerWidth / 5}
              height={containerWidth / 5}
              src={URL.createObjectURL(image.file as File)}
            />
            <Button
              className={styles.upload_result__item__remove}
              disabled={uploading}
              size="small"
              onClick={uploading ? undefined : () => onDelete(image)}
            >
              <DeleteOutlined />
            </Button>
          </div>
        ))}
      </AntdImage.PreviewGroup>
    </div>
  );
}
