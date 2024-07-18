import { render, screen } from "@testing-library/react";
import { ConfigProvider } from "antd";
import { AugmentationAlgorithms } from "../../Augmentation/types/augmentation-algorithms.enum";
import AugmentationsList from "./AugmentationsList";

describe("AugmentationsList", () => {
  it("renders all 3 items", () => {
    setup();
    expect(screen.getByText(/Blur/i)).toBeInTheDocument();
    expect(screen.getByText(/Grayscale/i)).toBeInTheDocument();
    expect(screen.getByText(/Random rotation/i)).toBeInTheDocument();
  });
});

function setup() {
  // 'deprecated' warning causes an error
  jest.spyOn(console, "error").mockImplementation();

  render(
    <ConfigProvider>
      <AugmentationsList
        augmentations={[
          {
            fromPercentage: 0.4,
            toPercentage: 0.85,
            algorithm: AugmentationAlgorithms.BLUR,
          },
          {
            fromPercentage: 0.15,
            toPercentage: 0.42,
            algorithm: AugmentationAlgorithms.GRAYSCALE,
          },
          {
            fromPercentage: 0.31,
            toPercentage: 0.75,
            algorithm: AugmentationAlgorithms.RANDOM_ROTATION,
          },
        ]}
      />
    </ConfigProvider>,
  );
}
