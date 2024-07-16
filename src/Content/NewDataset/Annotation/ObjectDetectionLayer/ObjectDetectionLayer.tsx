import ImageAnnotation from "ehsaantech-react-image-annotation";
import { RectangleSelector } from "ehsaantech-react-image-annotation/lib/selectors";
import { memo, useCallback, useEffect, useState } from "react";
import useDistinctClasses from "../../../../hooks/useDistinctClasses/useDistinctClasses";
import { ObjectDetectionImage } from "../../../../types/image.type";
import { LayerProps } from "../types/layer-props.type";
import BoxContent from "./BoxContent/BoxContent";
import Editor from "./Editor/Editor";
import { UIAnnotation } from "./types/ui-annotation.type";
import {
  metadataAnnotationToUIAnnotation,
  uiAnnotationToMetadataAnnotation,
} from "./utils/annotation.utils";

function ObjectDetectionLayer({
  currentImage,
  images,
  setMetadata,
}: LayerProps<ObjectDetectionImage>) {
  const [uiAnnotations, setUIAnnotations] = useState<UIAnnotation[]>([]);
  const [currentUIAnnotation, setCurrentUIAnnotation] = useState<
    Partial<UIAnnotation>
  >({});
  const allClasses = useDistinctClasses(
    images,
    (img) => img.metadata?.annotations.map((ann) => ann.class) || [],
  );

  useEffect(() => {
    const mdAnnotations = currentImage.metadata?.annotations || [];
    const imageUIAnnots = mdAnnotations.map(metadataAnnotationToUIAnnotation);
    setUIAnnotations(imageUIAnnots);
  }, [currentImage]);

  const addAnnotation = useCallback(
    (newAnnotation: UIAnnotation) => {
      newAnnotation.data.id = Math.random();
      const oldAnnots = currentImage.metadata?.annotations || [];
      const newAnnot = uiAnnotationToMetadataAnnotation(newAnnotation);
      setMetadata({ annotations: [...oldAnnots, newAnnot] });
      setCurrentUIAnnotation({});
    },
    [setMetadata, setCurrentUIAnnotation, currentImage],
  );

  const deleteAnnotation = useCallback(
    (annotation: UIAnnotation) => {
      const { id } = annotation.data;
      const index = uiAnnotations.findIndex((i) => i.data.id === id);
      uiAnnotations.splice(index, 1);
      const mdAnnots = uiAnnotations.map(uiAnnotationToMetadataAnnotation);
      setMetadata({ annotations: mdAnnots });
      setCurrentUIAnnotation({});
    },
    [uiAnnotations, setMetadata],
  );

  return (
    <ImageAnnotation
      src={URL.createObjectURL(currentImage.file as File)}
      style={{ width: 450, height: 450, margin: "auto" }}
      type={RectangleSelector.TYPE}
      annotations={uiAnnotations}
      value={currentUIAnnotation}
      onChange={setCurrentUIAnnotation}
      onSubmit={addAnnotation}
      renderEditor={(props: any) => Editor({ ...props, allClasses })}
      renderContent={(props: any) =>
        BoxContent({ ...props, onDelete: deleteAnnotation })
      }
    />
  );
}

export default memo(ObjectDetectionLayer);
