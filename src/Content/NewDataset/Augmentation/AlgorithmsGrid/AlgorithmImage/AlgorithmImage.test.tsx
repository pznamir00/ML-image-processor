import { render, screen, waitFor } from "@testing-library/react";
import { AugmentationAlgorithms } from "../../types/augmentation-algorithms.enum";
import AlgorithmImage from "./AlgorithmImage";

describe("AlgorithmImage", () => {
  it("renders image", async () => {
    setup();
    await waitFor(() => {
      const image = screen.getByTestId("alg-image");
      expect(image).toBeInTheDocument();
    });
  });
});

function setup() {
  return render(<AlgorithmImage alg={AugmentationAlgorithms.CROP} />);
}

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: () => ({
    algorithm: 4,
    toggleAlgorithm: jest.fn(),
  }),
}));
jest.mock("antd", () => ({
  ...jest.requireActual("antd"),
  Image: function () {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img data-testid="alg-image" />;
  },
}));
