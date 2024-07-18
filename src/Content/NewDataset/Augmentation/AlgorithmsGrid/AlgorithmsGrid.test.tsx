import { render, screen, waitFor } from "@testing-library/react";
import AlgorithmsGrid from "./AlgorithmsGrid";

describe("AlgorithmsGrid", () => {
  it("renders grid", async () => {
    setup();
    await waitFor(() => {
      const grid = screen.getByTestId("alg-grid");
      expect(grid).toBeInTheDocument();
    });
  });
});

function setup() {
  render(<AlgorithmsGrid />);
}

jest.mock("./AlgorithmImage/AlgorithmImage", () => () => <div />);
