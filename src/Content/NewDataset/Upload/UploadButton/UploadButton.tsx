import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { FileUploader } from "react-drag-drop-files";
import styles from "./UploadButton.module.scss";

export default function UploadButton({
  onChange,
}: {
  onChange: (fileList: FileList) => void;
}) {
  return (
    <FileUploader
      handleChange={onChange}
      name="file"
      multiple
      types={["PNG", "JPG", "GIF", "JPEG"]}
    >
      <Button
        className={styles.upload_button}
        type="dashed"
        data-testid="upload-btn"
      >
        <PlusOutlined className={styles.upload_button__icon} />
        <div className={styles.upload_button__text}>Upload</div>
      </Button>
    </FileUploader>
  );
}
