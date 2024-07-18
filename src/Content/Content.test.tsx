import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Content from "./Content";

describe("Content", () => {
  it('should redirect from "/" to "/datasets"', () => {
    setup("/");
    expect(screen.getByTestId("datasets")).toBeInTheDocument();
  });

  it('should render NewDataset component for "/datasets/add" route', () => {
    setup("/datasets/add");
    expect(screen.getByTestId("new-dataset")).toBeInTheDocument();
  });

  it('should render Datasets component for "/datasets" route', () => {
    setup("/datasets");
    expect(screen.getByTestId("datasets")).toBeInTheDocument();
  });
});

function setup(url: string) {
  render(
    <MemoryRouter initialEntries={[url]}>
      <Content />
    </MemoryRouter>,
  );
}

jest.mock("./Datasets/Datasets", () => () => (
  <div data-testid="datasets"></div>
));
jest.mock("./NewDataset/NewDataset", () => () => (
  <div data-testid="new-dataset"></div>
));
