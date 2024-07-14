import useNotification from "antd/es/notification/useNotification";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { usePostImageMutation } from "../../../store/images/api";
import { imagesActions } from "../../../store/images/reducer";
import { selectImages } from "../../../store/images/selectors";
import { StepProps } from "../types/step-props.type";
import { getDistinctFiles } from "../utils/files.utils";
import { UploadStatus } from "./types/upload-status.type";
import UploadActions from "./UploadActions/UploadActions";
import UploadButton from "./UploadButton/UploadButton";
import UploadResult from "./UploadResult/UploadResult";

export default function Upload({ goToNextStep }: StepProps) {
  const images = useAppSelector(selectImages);
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
        .then(() => {
          const progress = (+index + 1) / images.length;
          setStatus({ error: false, progress, uploading: true });
        })
        .catch(() => setStatus({ error: true, progress: 1, uploading: false }));
    }
    goToNextStep();
  }, [postImage, images, goToNextStep]);

  return (
    <Fragment>
      {notificationHolder}
      <UploadButton onChange={onFilesAdd} />
      <UploadResult images={images} status={status} onDelete={onFileDelete} />
      <UploadActions onClear={onClear} status={status} onStart={onStart} />
    </Fragment>
  );
}
