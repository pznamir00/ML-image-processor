import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { useContext } from "react";
import { AugmentationAlgorithms as Algorithms } from "../types/augmentation-algorithms.enum";
import CurrentAlgorithmProvider, {
  CurrentAlgorithmContext,
} from "./CurrentAlgorithm";

describe("CurrentAlgorithmProvider", () => {
  it("provides the initial state", () => {
    render(
      <CurrentAlgorithmProvider>
        <TestComponent />
      </CurrentAlgorithmProvider>,
    );

    expect(screen.getByTestId("algorithm")).toHaveTextContent("");
  });

  it("provides the context value to children components", () => {
    render(
      <CurrentAlgorithmProvider>
        <TestComponent />
      </CurrentAlgorithmProvider>,
    );

    expect(screen.getByTestId("toggle-button")).toBeInTheDocument();
  });
});

const TestComponent = () => {
  const context = useContext(CurrentAlgorithmContext);
  if (!context) {
    return null;
  }

  const { algorithm, toggleAlgorithm } = context;

  return (
    <div>
      <span data-testid="algorithm">{algorithm}</span>
      <button
        onClick={() => toggleAlgorithm(Algorithms.CROP)}
        data-testid="toggle-button"
      >
        Toggle Algorithm1
      </button>
    </div>
  );
};
