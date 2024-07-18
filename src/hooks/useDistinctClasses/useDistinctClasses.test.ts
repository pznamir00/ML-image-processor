import { renderHook } from "@testing-library/react";
import useDistinctClasses from "./useDistinctClasses";

describe("useDistinctClasses", () => {
  it("returns distinct classes", () => {
    const { result } = setup();
    expect(result.current).toEqual(["cls1", "cls2"]);
  });

  it("updates classes on images update", () => {
    const { result, rerender } = setup();
    rerender({ images: [{ class: "cls1" }, { class: "cls1" }] });
    expect(result.current).toEqual(["cls1"]);
  });
});

function setup() {
  const { result, rerender } = renderHook(
    ({ images }: any) => useDistinctClasses(images, (img: any) => img.class),
    {
      initialProps: {
        images: [
          { class: "cls1" } as any,
          { class: "cls2" },
          { class: "cls1" },
        ],
      },
    },
  );
  return { result, rerender };
}
