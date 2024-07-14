import { DeleteOutlined } from "@ant-design/icons";
import { Button, Image } from "antd";
import "./UploadResult.scss";

interface Props {
  images: File[];
  onDelete: (image: File) => void;
}

export default function UploadResult({ images, onDelete }: Props) {
  return (
    <div className="upload_result">
      <Image.PreviewGroup>
        {images.map((image, key) => (
          <div key={key} className="upload_result__item">
            <Image width={100} src={URL.createObjectURL(image)} />
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
