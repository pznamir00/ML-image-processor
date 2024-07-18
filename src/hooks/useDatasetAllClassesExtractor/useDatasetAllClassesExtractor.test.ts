import { renderHook } from "@testing-library/react";
import { DatasetTypes } from "../../types/dataset-types.enum";
import useDatasetAllClassesExtractor from "./useDatasetAllClassesExtractor";

describe("useDatasetAllClassesExtractor", () => {
  it("returns correct classes for classification dataset", () => {
    const { result } = setup({
      type: DatasetTypes.CLASSIFICATION,
      images: [
        { metadata: { class: "cls1" } },
        { metadata: { class: "cls1" } },
        { metadata: { class: "cls2" } },
      ],
    });
    expect(result.current).toEqual(2);
  });

  it("returns correct classes for object detection dataset", () => {
    const { result } = setup({
      type: DatasetTypes.OBJECT_DETECTION,
      images: [
        { metadata: { annotations: [{ class: "cls1" }, { class: "cls1" }] } },
        { metadata: { annotations: [{ class: "cls2" }, { class: "cls3" }] } },
        { metadata: { annotations: [{ class: "cls3" }, { class: "cls1" }] } },
      ],
    });
    expect(result.current).toEqual(3);
  });
});

function setup(dataset: any) {
  return renderHook(() => useDatasetAllClassesExtractor(dataset));
}
