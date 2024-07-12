import { render } from "@testing-library/react";
import Datasets from "./Datasets";

describe("Datasets", () => {
  it("", async () => {
    expect(true).toBeTruthy();
  });
});

function setup() {
  const view = render(<Datasets />);
  return { view };
}
