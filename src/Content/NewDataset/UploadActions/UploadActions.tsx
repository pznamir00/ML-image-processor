import { Button, Progress } from "antd";
import { memo } from "react";
import { UploadStatus } from "../types/upload-status.type";
import styles from "./UploadActions.module.scss";

interface Props {
  onClear: () => void;
  onStart: () => void;
  status: UploadStatus;
}

function UploadActions({ onClear, onStart, status }: Props) {
  return (
    <div className={styles.upload_actions}>
      <Button type="text" onClick={onClear} disabled={status?.uploading}>
        Clear
      </Button>
      {(status?.uploading || status?.error) && (
        <Progress
          className={styles.upload_actions__progress}
          percent={status.progress * 100}
          status={
            status.error
              ? "exception"
              : status.progress === 1
                ? "success"
                : "active"
          }
        />
      )}
      <Button type="primary" onClick={onStart} disabled={status?.uploading}>
        Upload
      </Button>
    </div>
  );
}

export default memo(UploadActions);
