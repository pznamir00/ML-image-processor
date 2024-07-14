import { DeleteOutlined } from "@ant-design/icons";
import { Button, Image } from "antd";
import { useRef } from "react";
import useRefWidth from "../../../hooks/useRefWidth/useRefWidth";
import "./UploadResult.scss";

interface Props {
  images: File[];
  onDelete: (image: File) => void;
}

export default function UploadResult({ images, onDelete }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const containerWidth = useRefWidth(containerRef);

  return (
    <div className="upload_result" ref={containerRef}>
      <Image.PreviewGroup>
        {images.map((image, key) => (
          <div key={key} className="upload_result__item">
            <Image
              width={containerWidth / 5}
              src={URL.createObjectURL(image)}
            />
            <Button
              className="upload_result__item__remove"
              size="small"
              onClick={() => onDelete(image)}
            >
              <DeleteOutlined />
            </Button>
          </div>
        ))}
      </Image.PreviewGroup>
    </div>
  );
}
