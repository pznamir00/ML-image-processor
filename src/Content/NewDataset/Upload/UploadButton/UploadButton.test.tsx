import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UploadButton from "./UploadButton";

describe("UploadButton", () => {
  it("emits onChange on upload", async () => {
    setup();
    await waitFor(() => {
      // eslint-disable-next-line testing-library/no-node-access
      const input = document.querySelector("input") as HTMLElement;
      input.style.pointerEvents = "unset";
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      userEvent.upload(input, [new File([], "")]);
    });
  });
});

function setup() {
  const onChange = jest.fn(console.log);
  render(<UploadButton onChange={onChange} />);
  return { onChange };
}
