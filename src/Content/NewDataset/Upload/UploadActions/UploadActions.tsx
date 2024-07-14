import { Button, Progress } from "antd";
import { memo } from "react";
import styles from "./UploadActions.module.scss";

interface Props {
  onClear: () => void;
  onStart: () => void;
  onFinish: () => void;
  progress: number;
  uploading: boolean;
  error: string | null;
}

function UploadActions({
  onClear,
  onStart,
  onFinish,
  progress,
  uploading,
  error,
}: Props) {
  const uploadedSuccessfully = progress === 1;

  return (
    <div className={styles.upload_actions}>
      <Button type="text" onClick={onClear} disabled={uploading}>
        Clear
      </Button>
      {(uploading || error || uploadedSuccessfully) && (
        <Progress
          className={styles.upload_actions__progress}
          percent={progress * 100}
          status={
            error ? "exception" : uploadedSuccessfully ? "success" : "active"
          }
        />
      )}
      <div>
        <Button
          type="primary"
          onClick={onStart}
          disabled={uploading || uploadedSuccessfully}
        >
          Upload
        </Button>
        <Button
          type="primary"
          className={styles.upload_actions__finish_btn}
          onClick={onFinish}
          disabled={!!(!uploadedSuccessfully || error)}
        >
          Finish
        </Button>
      </div>
    </div>
  );
}

export default memo(UploadActions);
