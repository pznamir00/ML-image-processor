import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { datasetMock } from "../../../mocks/dataset.mock";
import { imagesMock } from "../../../mocks/images.mock";
import { Dataset } from "../../../types/dataset.type";
import { Image } from "../../../types/image.type";
import Overview from "./Overview";

describe("Overview", () => {
  it("shows correct classes number", async () => {
    setup();
    await waitFor(() => {
      const classes = screen.getByText(/1 classes/i);
      expect(classes).toBeInTheDocument();
    });
  });

  it("shows correct images number", async () => {
    setup();
    await waitFor(() => {
      const images = screen.getByText(/2 images/i);
      expect(images).toBeInTheDocument();
    });
  });

  it("shows augmentations list", async () => {
    setup();
    await waitFor(() => {
      const list = screen.getByTestId("augmentations-list");
      expect(list).toBeInTheDocument();
    });
  });

  it("calls goToNextStep on 'Finish' click", async () => {
    const { goToNextStep } = setup();
    await waitFor(() => {
      const finishBtn = screen.getByText(/Finish/i);
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      userEvent.click(finishBtn);
      expect(goToNextStep).toBeCalled();
    });
  });
});

function setup() {
  jest.spyOn(console, "error").mockImplementation();

  const images = getImages();
  const dataset = getDataset();
  dataset.images = images as any;
  const goToNextStep = jest.fn();

  render(
    <Overview images={images} dataset={dataset} goToNextStep={goToNextStep} />,
  );

  return { goToNextStep };
}

function getDataset(): Dataset {
  return { ...datasetMock };
}

function getImages(): Image[] {
  return [...imagesMock];
}

jest.mock("../../../utils/images.utils", () => ({
  ...jest.requireActual("../../../utils/images.utils"),
  getImageUrl: jest.fn(() => ""),
}));
jest.mock("../components/AugmentationsList/AugmentationsList", () => () => (
  <div data-testid="augmentations-list" />
));
