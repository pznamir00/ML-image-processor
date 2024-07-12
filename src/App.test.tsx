import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders header", () => {
    setup();
    const header = screen.getByTestId("header");
    expect(header).toBeInTheDocument();
  });

  it("renders sidebar", () => {
    setup();
    const sidebar = screen.getByTestId("sidebar");
    expect(sidebar).toBeInTheDocument();
  });

  it("renders content", () => {
    setup();
    const content = screen.getByTestId("content");
    expect(content).toBeInTheDocument();
  });
});

function setup() {
  const view = render(<App />);
  return { view };
}
