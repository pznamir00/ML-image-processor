import { renderHook } from "@testing-library/react";
import useNotification from "antd/es/notification/useNotification";
import useToastOnError from "./useToastOnError";

describe("useToastOnError", () => {
  const error = "Test Error";
  const toastText = "An error occurred";

  it("should not show notification when error is null", () => {
    const { result } = renderHook(() => useToastOnError(null, toastText));
    expect(result.current.props["data-testid"]).toBe("notification-holder");
    expect(useNotification()[0].error).not.toHaveBeenCalled();
  });

  it("should show notification when error is provided", () => {
    const { result, rerender } = renderHook(
      ({ error }) => useToastOnError(error, toastText),
      { initialProps: { error: null } },
    );
    expect(result.current.props["data-testid"]).toBe("notification-holder");
    //@ts-ignore
    rerender({ error });
    expect(useNotification()[0].error).toHaveBeenCalledWith({
      message: toastText,
      placement: "bottomRight",
      duration: 3,
    });
  });
});

jest.mock("antd/es/notification/useNotification", () => {
  const notificationApi = {
    error: jest.fn(),
  };
  return () => [notificationApi, <div data-testid="notification-holder" />];
});
