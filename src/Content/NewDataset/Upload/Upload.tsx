import useNotification from "antd/es/notification/useNotification";
import { Fragment, useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { imagesActions, uploadImage } from "../../../store/images/reducer";
import {
  selectImages,
  selectImagesError,
  selectImagesLoading,
} from "../../../store/images/selectors";
import { Image } from "../../../types/image.type";
import { StepProps } from "../types/step-props.type";
import UploadActions from "./UploadActions/UploadActions";
import UploadButton from "./UploadButton/UploadButton";
import UploadResult from "./UploadResult/UploadResult";
import {
  calculateProgress,
  getDistinctFiles,
  newFileToImage,
} from "./utils/images.utils";

export default function Upload({ goToNextStep, dataset }: StepProps) {
  const images = useAppSelector(selectImages);
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectImagesError);
  const loading = useAppSelector(selectImagesLoading);
  const [notificationApi, notificationHolder] = useNotification();

  useEffect(() => {
    if (error) {
      notificationApi.error({
        message: "Upload Failed",
        placement: "bottomRight",
        duration: 3,
      });
    }
  }, [error, notificationApi]);

  const onFilesAdd = useCallback(
    (fileList: FileList) => {
      const files = Array.from(fileList);
      let newImages = files.map(newFileToImage);
      newImages = getDistinctFiles(newImages, images);
      dispatch(imagesActions.set(newImages));
    },
    [dispatch, images],
  );

  const onFileDelete = useCallback(
    (image: Image) => dispatch(imagesActions.removeOne(image)),
    [dispatch],
  );

  const onClear = useCallback(
    () => dispatch(imagesActions.clear()),
    [dispatch],
  );

  const onStart = useCallback(async () => {
    dispatch(imagesActions.setLoading(true));
    for await (const image of images) {
      if (!error) {
        await dispatch(uploadImage({ image, datasetId: dataset!.id }));
      }
    }
    dispatch(imagesActions.setLoading(false));
  }, [images, dispatch, error, dataset]);

  return (
    <Fragment>
      {notificationHolder}
      <UploadButton onChange={onFilesAdd} />
      <UploadResult
        images={images}
        uploading={loading}
        onDelete={onFileDelete}
      />
      <UploadActions
        onClear={onClear}
        uploading={loading}
        progress={calculateProgress(images)}
        error={error}
        onStart={onStart}
        onFinish={goToNextStep}
      />
    </Fragment>
  );
}
