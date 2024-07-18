import { renderHook, waitFor } from "@testing-library/react";
import useRefWidth from "./useRefWidth";

describe("useRefWidth", () => {
  it("returns ref width", () => {
    const { result } = setup();
    expect(result.current).toEqual(100);
  });

  it("returns updated ref width on resize", async () => {
    const { ref, result } = setup();
    await waitFor(() => {
      ref.current.offsetWidth = 500;
      window.dispatchEvent(new Event("resize"));
      expect(result.current).toEqual(500);
    });
  });
});

function setup() {
  const ref: any = { current: { offsetWidth: 100 } };
  return {
    ...renderHook(() => useRefWidth(ref)),
    ref,
  };
}
