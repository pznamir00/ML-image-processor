import {
  calculateProgress,
  getDistinctFiles,
  newFileToImage,
} from "./images.utils";

describe("images utils", () => {
  describe("getDistinctFiles", () => {
    it("returns only distinct files by names", () => {
      const images1: any = [
        { name: "img1" },
        { name: "img2" },
        { name: "img3" },
      ];
      const images2: any = [
        { name: "img1" },
        { name: "img4" },
        { name: "img3" },
      ];
      const result = getDistinctFiles(images1, images2);
      expect(result).toHaveLength(4);
    });
  });

  describe("newFileToImage", () => {
    it("converts file to image object", () => {
      const file = new File([], "DSC001.JPG");
      const result = newFileToImage(file, 5);
      expect(result).toEqual({
        name: file.name,
        url: null,
        isUploaded: false,
        datasetId: 5,
        file,
      });
    });
  });

  describe("calculateProgress", () => {
    it("returns correct progress", () => {
      const images: any = [
        { name: "img1", isUploaded: true },
        { name: "img2", isUploaded: true },
        { name: "img3", isUploaded: true },
        { name: "img4", isUploaded: false },
        { name: "img5", isUploaded: false },
      ];
      const result = calculateProgress(images);
      expect(result).toEqual(0.6);
    });
  });
});
