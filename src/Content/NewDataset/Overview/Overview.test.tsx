import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DatasetTypes } from "../../../types/dataset-types.enum";
import { Dataset } from "../../../types/dataset.type";
import { Image } from "../../../types/image.type";
import { AugmentationAlgorithms } from "../Augmentation/types/augmentation-algorithms.enum";
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
  return {
    id: 5,
    name: "dataset-1",
    type: DatasetTypes.CLASSIFICATION,
    images: [],
    augmentations: [
      {
        fromPercentage: 0.1,
        toPercentage: 0.4,
        algorithm: AugmentationAlgorithms.CROP,
      },
    ],
  };
}

function getImages(): Image[] {
  return [
    {
      name: "DSC000.JPG",
      url: "https://some-url.com",
      isUploaded: true,
      datasetId: 5,
      metadata: { class: "cls1" },
    },
    {
      name: "DSC001.JPG",
      url: "https://some-url.com",
      isUploaded: true,
      datasetId: 5,
      metadata: { class: "cls1" },
    },
  ];
}

jest.mock("../../../utils/images.utils", () => ({
  ...jest.requireActual("../../../utils/images.utils"),
  getImageUrl: jest.fn(() => ""),
}));
jest.mock("../components/AugmentationsList/AugmentationsList", () => () => (
  <div data-testid="augmentations-list" />
));
