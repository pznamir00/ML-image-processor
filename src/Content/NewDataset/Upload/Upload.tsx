import { Fragment, useCallback } from "react";
import useToastOnError from "../../../hooks/useToastOnError/useToastOnError";
import { datasetsActions } from "../../../store/datasets/reducer";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { imagesActions } from "../../../store/images/reducer";
import {
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

export default function Upload({ goToNextStep, dataset, images }: StepProps) {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectImagesError);
  const loading = useAppSelector(selectImagesLoading);
  const notificationHolder = useToastOnError(error, "Upload Failed");

  const onFilesAdd = useCallback(
    (fileList: FileList) => {
      const files = Array.from(fileList);
      let newImages = files.map((file) => newFileToImage(file, dataset.id));
      newImages = getDistinctFiles(newImages, images);
      dispatch(imagesActions.set(newImages));
    },
    [dispatch, images, dataset],
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
        await dispatch(
          imagesActions.uploadImage({ image, datasetId: dataset!.id }),
        );
      }
    }
    dispatch(imagesActions.setLoading(false));
    dispatch(datasetsActions.setImages(images));
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
