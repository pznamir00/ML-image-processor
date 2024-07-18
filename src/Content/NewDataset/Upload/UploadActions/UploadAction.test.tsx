import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UploadActions from "./UploadActions";

describe("UploadActions", () => {
  it('emits onClear on "Clear" click', async () => {
    const { onClear } = setup();
    await waitFor(() => {
      const clearBtn = screen.getByText(/Clear/i);
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      userEvent.click(clearBtn);
      expect(onClear).toBeCalled();
    });
  });

  it('emits onStart on "Upload" click', async () => {
    const { onStart } = setup();
    await waitFor(() => {
      const uploadBtn = screen.getByText(/Upload/i);
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      userEvent.click(uploadBtn);
      expect(onStart).toBeCalled();
    });
  });

  it('emits onFinish on "Next" click', async () => {
    const { onFinish } = setup(1);
    await waitFor(() => {
      const nextBtn = screen.getByText(/Next/i);
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      userEvent.click(nextBtn);
      expect(onFinish).toBeCalled();
    });
  });
});

function setup(
  progress = 0.45,
  uploading = false,
  error: string | null = null,
) {
  const onClear = jest.fn();
  const onStart = jest.fn();
  const onFinish = jest.fn();

  const { rerender } = render(
    <UploadActions
      onClear={onClear}
      onStart={onStart}
      onFinish={onFinish}
      progress={progress}
      uploading={uploading}
      error={error}
    />,
  );

  return { rerender, onClear, onStart, onFinish };
}
