import { render, screen, waitFor } from "@testing-library/react";
import MatchMediaMock from "jest-matchmedia-mock";
import App from "./App";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let matchMedia: MatchMediaMock;

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
  matchMedia = new MatchMediaMock();
  const view = render(<App />);
  return { view };
}

jest.mock("./Content/Content", function () {
  return function () {
    return <div data-testid="content" />;
  };
});
