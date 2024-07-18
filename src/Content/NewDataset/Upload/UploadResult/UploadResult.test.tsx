import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UploadResult from "./UploadResult";

describe("UploadResult", () => {
  it("shows 3 images", async () => {
    setup();
    await waitFor(() => {
      const items = screen.getAllByTestId("upload-result-image");
      expect(items).toHaveLength(3);
    });
  });

  it("emits onDelete on trash click", async () => {
    const { onDelete } = setup();
    await waitFor(() => {
      const [btn] = screen.getAllByTestId("upload-result-delete-btn");
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      userEvent.click(btn);
      expect(onDelete).toBeCalledWith({ id: 1 });
    });
  });
});

function setup() {
  const onDelete = jest.fn();
  const images: any = [{ id: 1 }, { id: 2 }, { id: 3 }];

  render(
    <UploadResult images={images} uploading={false} onDelete={onDelete} />,
  );

  return { onDelete };
}

jest.mock("../../../../utils/images.utils");
