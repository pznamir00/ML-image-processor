import { render, screen } from "@testing-library/react";
import Sidebar from "./Sidebar";

describe("Sidebar", () => {
  it("shows 'Home' item", () => {
    setup();
    const homeItem = screen.getByText(/Home/i);
    expect(homeItem).toBeInTheDocument();
  });

  it("shows 'New dataset' item", () => {
    setup();
    const newDatasetItem = screen.getByText(/New dataset/i);
    expect(newDatasetItem).toBeInTheDocument();
  });

  it("shows 'Datasets' item", () => {
    setup();
    const datasetsItem = screen.getByText(/Datasets/i);
    expect(datasetsItem).toBeInTheDocument();
  });
});

function setup() {
  const view = render(<Sidebar />);
  return { view };
}
