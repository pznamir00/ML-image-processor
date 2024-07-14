import { Fragment, useCallback, useState } from "react";
import "./NewDataset.scss";
import UploadActions from "./UploadActions/UploadActions";
import UploadButton from "./UploadButton/UploadButton";
import UploadResult from "./UploadResult/UploadResult";
import { getDistinctFiles, removeFileFromArray } from "./utils/files.utils";

export default function NewDataset() {
  const [images, setImages] = useState<File[]>([]);

  const onFilesAdd = useCallback(
    (fileList: FileList) => {
      const files = Array.from(fileList);
      const newImages = getDistinctFiles(files, images);
      setImages(newImages);
    },
    [images],
  );

  const onFileDelete = useCallback(
    (image: File) => {
      const newImages = removeFileFromArray(images, image);
      setImages(newImages);
    },
    [images],
  );

  const onClear = useCallback(() => setImages([]), []);

  const onStart = useCallback(() => {}, []);

  return (
    <Fragment>
      <UploadButton onChange={onFilesAdd} />
      <UploadResult images={images} onDelete={onFileDelete} />
      <UploadActions onClear={onClear} onStart={onStart} />
    </Fragment>
  );
}
