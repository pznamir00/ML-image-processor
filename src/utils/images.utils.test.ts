import {
  getClassesFromClassificationImage,
  getClassesFromObjectDetectionImage,
  getImageUrl,
} from "./images.utils";

describe("images utils", () => {
  describe("getImageUrl", () => {
    it("calls createObjectURL", () => {
      URL.createObjectURL = jest.fn();
      const image: any = { file: new File([], "file.jpg") };
      getImageUrl(image);
      expect(URL.createObjectURL).toBeCalledWith(image.file);
    });

    it("returns object url", () => {
      URL.createObjectURL = jest.fn().mockReturnValue("result");
      const image: any = { file: new File([], "file.jpg") };
      const result = getImageUrl(image);
      expect(result).toEqual("result");
    });
  });

  describe("getClassesFromClassificationImage", () => {
    it("returns class of image", () => {
      const image: any = { metadata: { class: "t-shirt" } };
      const result = getClassesFromClassificationImage(image);
      expect(result).toEqual(["t-shirt"]);
    });
  });

  describe("getClassesFromObjectDetectionImage", () => {
    it("returns classes of image", () => {
      const image: any = {
        metadata: {
          annotations: [{ class: "t-shirt" }, { class: "jacket" }],
        },
      };
      const result = getClassesFromObjectDetectionImage(image);
      expect(result).toEqual(["t-shirt", "jacket"]);
    });
  });
});
