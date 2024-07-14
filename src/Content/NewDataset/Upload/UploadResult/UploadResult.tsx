import { DeleteOutlined } from "@ant-design/icons";
import { Button, Image } from "antd";
import { useRef } from "react";
import useRefWidth from "../../../../hooks/useRefWidth/useRefWidth";
import { UploadStatus } from "../types/upload-status.type";
import styles from "./UploadResult.module.scss";

interface Props {
  images: File[];
  onDelete: (image: File) => void;
  status: UploadStatus;
}

export default function UploadResult({ images, onDelete, status }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const containerWidth = useRefWidth(containerRef);

  return (
    <div className={styles.upload_result} ref={containerRef}>
      <Image.PreviewGroup>
        {images.map((image, key) => (
          <div key={key} className={styles.upload_result__item}>
            <Image
              width={containerWidth / 5}
              src={URL.createObjectURL(image)}
            />
            <Button
              className={styles.upload_result__item__remove}
              disabled={status?.uploading}
              size="small"
              onClick={status?.uploading ? undefined : () => onDelete(image)}
            >
              <DeleteOutlined />
            </Button>
          </div>
        ))}
      </Image.PreviewGroup>
    </div>
  );
}
