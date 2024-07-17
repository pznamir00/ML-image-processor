export enum ExportFormats {
  YOLOv8 = "yolov8",
  COCO = "coco",
  CREATE_ML = "create-ml",
  TENSORFLOW_OBJECT_DETECTION = "tf-object-detection",
  RETINANET_KERAS = "retinanet-keras",
}

export const ExportFormatLabels = {
  [ExportFormats.YOLOv8]: "YOLOv8",
  [ExportFormats.COCO]: "Coco",
  [ExportFormats.CREATE_ML]: "CreateML",
  [ExportFormats.TENSORFLOW_OBJECT_DETECTION]: "Tensorflow Object Detection",
  [ExportFormats.RETINANET_KERAS]: "RetinaNet Keras",
};
