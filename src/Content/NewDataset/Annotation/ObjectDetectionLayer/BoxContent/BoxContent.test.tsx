import { render, screen, waitFor } from "@testing-library/react";
import { annotationMock } from "../mocks/annotation.mock";
import BoxContent from "./BoxContent";

describe("BoxContent", () => {
  it("renders box", async () => {
    setup();
    await waitFor(() => {
      const box = screen.getByTestId("box-content");
      expect(box).toBeInTheDocument();
    });
  });
});

function setup() {
  const annotation = annotationMock;
  render(<BoxContent annotation={annotation} onDelete={jest.fn} />);
}
