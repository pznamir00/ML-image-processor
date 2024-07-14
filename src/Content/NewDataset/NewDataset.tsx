import useNotification from "antd/es/notification/useNotification";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { usePostImageMutation } from "../../store/images/api";
import { imagesActions } from "../../store/images/reducer";
import "./NewDataset.scss";
import { UploadStatus } from "./types/upload-status.type";
import UploadActions from "./UploadActions/UploadActions";
import UploadButton from "./UploadButton/UploadButton";
import UploadResult from "./UploadResult/UploadResult";
import { getDistinctFiles } from "./utils/files.utils";

export default function NewDataset() {
  const images = useAppSelector((state) => state.images.value);
  const dispatch = useAppDispatch();
  const [postImage] = usePostImageMutation();
  const [status, setStatus] = useState<UploadStatus>(null);
  const [notificationApi, notificationHolder] = useNotification();

  useEffect(() => {
    if (status?.error) {
      notificationApi.error({
        message: "Upload Failed",
        placement: "bottomRight",
        duration: 3,
      });
    }
  }, [status, notificationApi]);

  const onFilesAdd = useCallback(
    (fileList: FileList) => {
      const files = Array.from(fileList);
      const newImages = getDistinctFiles(files, images);
      dispatch(imagesActions.set(newImages));
    },
    [dispatch, images],
  );

  const onFileDelete = useCallback(
    (image: File) => dispatch(imagesActions.removeOne(image)),
    [dispatch],
  );

  const onClear = useCallback(
    () => dispatch(imagesActions.clear()),
    [dispatch],
  );

  const onStart = useCallback(async () => {
    setStatus({ error: false, progress: 0, uploading: true });
    for await (const [index, image] of Object.entries(images)) {
      await postImage({ file: image })
        .unwrap()
        .then(() => new Promise((r) => setTimeout(r, 1000)))
        .then(() =>
          setStatus({
            error: false,
            progress: (+index + 1) / images.length,
            uploading: true,
          }),
        )
        .catch(() =>
          setStatus({
            error: true,
            progress: 1,
            uploading: false,
          }),
        );
    }
  }, [postImage, images]);

  return (
    <Fragment>
      {notificationHolder}
      <UploadButton onChange={onFilesAdd} />
      <UploadResult images={images} status={status} onDelete={onFileDelete} />
      <UploadActions onClear={onClear} status={status} onStart={onStart} />
    </Fragment>
  );
}
