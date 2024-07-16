import { RectangleSelector } from "ehsaantech-react-image-annotation/lib/selectors";
import { MetadataAnnotation } from "../../../../../types/image.type";
import { UIAnnotation } from "../types/ui-annotation.type";

export function metadataAnnotationToUIAnnotation(
  annotation: MetadataAnnotation,
) {
  return {
    geometry: {
      type: RectangleSelector.TYPE,
      x: annotation.min.x,
      y: annotation.min.y,
      width: annotation.max.x - annotation.min.x,
      height: annotation.max.y - annotation.min.y,
    },
    data: {
      text: annotation.class,
      id: Math.random(),
    },
  };
}

export function uiAnnotationToMetadataAnnotation(annotation: UIAnnotation) {
  return {
    min: {
      x: annotation.geometry.x,
      y: annotation.geometry.y,
    },
    max: {
      x: annotation.geometry.x + annotation.geometry.width,
      y: annotation.geometry.y + annotation.geometry.height,
    },
    class: annotation.data.text,
  };
}
