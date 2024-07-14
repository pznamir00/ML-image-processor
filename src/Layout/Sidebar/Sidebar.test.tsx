import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "./Sidebar";

describe("Sidebar", () => {
  it("shows 'Home' item", async () => {
    setup();
    await waitFor(() => {
      const homeItem = screen.getByText(/Home/i);
      expect(homeItem).toBeInTheDocument();
    });
  });

  it("shows 'New dataset' item", async () => {
    setup();
    await waitFor(() => {
      const newDatasetItem = screen.getByText(/New dataset/i);
      expect(newDatasetItem).toBeInTheDocument();
    });
  });

  it("shows 'Datasets' item", async () => {
    setup();
    await waitFor(() => {
      const datasetsItem = screen.getByText(/Datasets/i);
      expect(datasetsItem).toBeInTheDocument();
    });
  });
});

function setup() {
  const view = render(
    <BrowserRouter>
      <Sidebar />
    </BrowserRouter>,
  );
  return { view };
}

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "/datasets/new",
  }),
}));
