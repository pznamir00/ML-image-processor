import { render, screen, waitFor } from "@testing-library/react";
import MatchMediaMock from "jest-matchmedia-mock";
import { annotationMock } from "../mocks/annotation.mock";
import Editor from "./Editor";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let matchMedia: MatchMediaMock;

describe("Editor", () => {
  it("renders editor", async () => {
    setup();
    await waitFor(() => {
      const editor = screen.getByTestId("editor");
      expect(editor).toBeInTheDocument();
    });
  });
});

function setup() {
  matchMedia = new MatchMediaMock();

  render(
    <Editor
      annotation={annotationMock}
      allClasses={["cl1", "cl2"]}
      onChange={jest.fn}
      onSubmit={jest.fn}
    />,
  );
}
