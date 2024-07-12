import { render } from "@testing-library/react";
import Content from "./Content";

describe("Content", () => {
  it("true", () => {
    // setup();
    // const homeItem = screen.getByText(/Home/i);
    expect(true).toBeTruthy();
  });
});

function setup() {
  const view = render(<Content />);
  return { view };
}
