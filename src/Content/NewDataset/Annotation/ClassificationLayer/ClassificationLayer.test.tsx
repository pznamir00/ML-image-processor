import { render, screen, waitFor } from "@testing-library/react";
import MatchMediaMock from "jest-matchmedia-mock";
import { imagesMock } from "../../../../mocks/images.mock";
import { ClassificationImage } from "../../../../types/image.type";
import ClassificationLayer from "./ClassificationLayer";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let matchMedia: MatchMediaMock;

describe("ClassificationLayer", () => {
  it("renders image", async () => {
    setup();
    await waitFor(() => {
      const img = screen.getByTestId("classification-layer-image");
      expect(img).toBeInTheDocument();
    });
  });
});

function setup() {
  matchMedia = new MatchMediaMock();
  URL.createObjectURL = jest.fn();

  const images = [...imagesMock] as ClassificationImage[];
  const image: ClassificationImage = {
    ...images[0],
    file: new File([], "file1.jpg"),
  };
  const setMetadata = jest.fn();

  render(
    <ClassificationLayer
      currentImage={image}
      images={[...images]}
      setMetadata={setMetadata}
    />,
  );
  return { setMetadata };
}

jest.mock("antd", () => ({
  ...jest.requireActual("antd"),
  AutoComplete: ({ ...props }: any) => (
    <input data-testid="search-input" {...props} />
  ),
}));
