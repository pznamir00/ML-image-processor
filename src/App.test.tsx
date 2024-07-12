import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders header", async () => {
    setup();
    await waitFor(() => {
      const header = screen.getByTestId("header");
      expect(header).toBeInTheDocument();
    });
  });

  it("renders sidebar", async () => {
    setup();
    await waitFor(() => {
      const sidebar = screen.getByTestId("sidebar");
      expect(sidebar).toBeInTheDocument();
    });
  });

  it("renders content", async () => {
    setup();
    await waitFor(() => {
      const content = screen.getByTestId("content");
      expect(content).toBeInTheDocument();
    });
  });
});

function setup() {
  const view = render(<App />);
  return { view };
}
