import { render } from "@testing-library/react";
import NewDataset from "./NewDataset";

describe("NewDataset", () => {
  it("", async () => {
    expect(true).toBeTruthy();
  });
});

function setup() {
  const view = render(<NewDataset />);
  return { view };
}
