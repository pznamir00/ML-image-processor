import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import MatchMediaMock from "jest-matchmedia-mock";
import { Provider } from "react-redux";
import { datasetsActions } from "../../../store/datasets/reducer";
import {
  selectCurrentDataset,
  selectDatasetsError,
  selectDatasetsLoading,
} from "../../../store/datasets/selectors";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { store } from "../../../store/store";
import { DatasetTypes } from "../../../types/dataset-types.enum";
import Form from "./Form";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let matchMedia: MatchMediaMock;

describe("Form", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should dispatch createDataset action on form submission", async () => {
    const { dispatchMock } = setup();

    fireEvent.change(screen.getByTestId("name-input"), {
      target: { value: "Test Dataset" },
    });
    fireEvent.click(screen.getByText("Object Detection"));

    fireEvent.click(screen.getByRole("button", { name: /Next/i }));

    await waitFor(() => {
      //@ts-ignore
      expect(dispatchMock).toHaveBeenCalledWith(
        //@ts-ignore
        datasetsActions.createDataset({
          name: "Test Dataset",
          type: DatasetTypes.OBJECT_DETECTION,
          images: [],
        }),
      );
    });
  });
});

function setup() {
  matchMedia = new MatchMediaMock();

  const dispatchMock = jest.fn();
  //@ts-ignore
  useAppDispatch.mockReturnValue(dispatchMock);
  //@ts-ignore
  useAppSelector.mockImplementation((selector) => {
    switch (selector) {
      case selectDatasetsLoading:
        return false;
      case selectDatasetsError:
        return null;
      case selectCurrentDataset:
        return null;
      default:
        return null;
    }
  });
  const goToNextStepMock = jest.fn();
  render(
    <Provider store={store}>
      <Form goToNextStep={goToNextStepMock} />
    </Provider>,
  );
  return { dispatchMock, goToNextStepMock };
}

jest.mock("../../../store/hooks", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock("../../../store/datasets/reducer", () => ({
  datasetsActions: {
    createDataset: jest.fn(),
  },
}));

jest.mock("../../../hooks/useToastOnError/useToastOnError", () =>
  jest.fn(() => <div data-testid="notification-holder" />),
);
