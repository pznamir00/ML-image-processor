import { render, screen, waitFor } from "@testing-library/react";
import MatchMediaMock from "jest-matchmedia-mock";
import { imagesMock } from "../../../../mocks/images.mock";
import ObjectDetectionLayer from "./ObjectDetectionLayer";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let matchMedia: MatchMediaMock;

describe("ObjectDetectionLayer", () => {
  it("renders annotation layer", async () => {
    setup();
    await waitFor(() => {
      const layer = screen.getByText(/Click and Drag to Annotate/i);
      expect(layer).toBeInTheDocument();
    });
  });
});

function setup() {
  const images = [
    { ...imagesMock[0], metadata: { annotations: [] } },
    { ...imagesMock[1], metadata: { annotations: [] } },
  ];

  jest.spyOn(console, "warn").mockImplementation();
  jest.spyOn(console, "error").mockImplementation();
  URL.createObjectURL = jest.fn();
  matchMedia = new MatchMediaMock();

  render(
    <ObjectDetectionLayer
      currentImage={images[0]}
      images={images}
      setMetadata={jest.fn}
    />,
  );
}
