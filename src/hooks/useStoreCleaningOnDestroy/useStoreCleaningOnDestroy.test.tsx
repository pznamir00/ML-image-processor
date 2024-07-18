import { cleanup, render } from "@testing-library/react";
import { datasetsActions } from "../../store/datasets/reducer";
import { useAppDispatch } from "../../store/hooks";
import { imagesActions } from "../../store/images/reducer";
import useStoreCleaningOnDestroy from "./useStoreCleaningOnDestroy";

describe("useStoreCleaningOnDestroy", () => {
  let dispatchMock: any;

  beforeEach(() => {
    dispatchMock = jest.fn();
    //@ts-ignore
    useAppDispatch.mockReturnValue(dispatchMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("should dispatch clear actions on unmount", () => {
    const { unmount } = render(<TestComponent />);
    unmount();
    expect(dispatchMock).toHaveBeenCalledWith(imagesActions.clear());
    expect(dispatchMock).toHaveBeenCalledWith(datasetsActions.clear());
  });
});

function TestComponent() {
  useStoreCleaningOnDestroy();
  return <div>Test Component</div>;
}

jest.mock("../../store/hooks", () => ({ useAppDispatch: jest.fn() }));
jest.mock("../../store/images/reducer", () => ({
  imagesActions: {
    clear: jest.fn(),
  },
}));
jest.mock("../../store/datasets/reducer", () => ({
  datasetsActions: {
    clear: jest.fn(),
  },
}));
