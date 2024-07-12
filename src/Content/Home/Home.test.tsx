import { render } from "@testing-library/react";
import Home from "./Home";

describe("Home", () => {
  it("", async () => {
    expect(true).toBeTruthy();
  });
});

function setup() {
  const view = render(<Home />);
  return { view };
}
