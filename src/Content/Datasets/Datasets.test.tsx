import { render, screen, waitFor } from "@testing-library/react";
import { ConfigProvider } from "antd";
import MatchMediaMock from "jest-matchmedia-mock";
import { Provider } from "react-redux";
import useStoreCleaningOnDestroy from "../../hooks/useStoreCleaningOnDestroy/useStoreCleaningOnDestroy";
import { http } from "../../store/http-client";
import { store } from "../../store/store";
import { DatasetTypes } from "../../types/dataset-types.enum";
import Datasets from "./Datasets";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let matchMedia: MatchMediaMock;

describe("Datasets", () => {
  it("renders dataset rows", async () => {
    setup();
    await waitFor(() => {
      const dataset1Row = screen.getByText(/dataset 1/i);
      const dataset2Row = screen.getByText(/dataset 2/i);
      expect(dataset1Row).toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(dataset2Row).toBeInTheDocument();
    });
  });

  it("clears store on destroy", async () => {
    setup();
    await waitFor(() => {
      expect(useStoreCleaningOnDestroy).toBeCalled();
    });
  });
});

function setup() {
  matchMedia = new MatchMediaMock();

  jest.spyOn(http, "get").mockReturnValue({
    //@ts-ignore
    data: [
      {
        id: 1,
        name: "dataset 1",
        type: DatasetTypes.CLASSIFICATION,
        images: [],
        augmentations: [],
      },
      {
        id: 1,
        name: "dataset 2",
        type: DatasetTypes.OBJECT_DETECTION,
        images: [{}, {}],
        augmentations: [{}, {}, {}],
      },
    ],
  });

  const view = render(
    <Provider store={store}>
      <ConfigProvider>
        <Datasets />
      </ConfigProvider>
    </Provider>,
  );

  return { view };
}

jest.mock(
  "../../hooks/useStoreCleaningOnDestroy/useStoreCleaningOnDestroy",
  () => {
    const mock = jest.fn();
    return mock;
  },
);
