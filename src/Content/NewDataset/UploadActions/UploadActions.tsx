import { Button } from "antd";
import { memo } from "react";
import "./UploadActions.scss";

interface Props {
  onClear: () => void;
  onStart: () => void;
}

function UploadActions({ onClear, onStart }: Props) {
  return (
    <div className="upload_actions">
      <Button type="text" onClick={onClear}>
        Clear
      </Button>
      <Button type="primary" onClick={onStart}>
        Upload
      </Button>
    </div>
  );
}

export default memo(UploadActions);
