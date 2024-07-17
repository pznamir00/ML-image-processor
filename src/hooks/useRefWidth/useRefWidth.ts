import {
  MutableRefObject,
  useDebugValue,
  useLayoutEffect,
  useState,
} from "react";

export default function useRefWidth(ref: MutableRefObject<HTMLElement | null>) {
  const [width, setWidth] = useState(0);
  useDebugValue(width);

  useLayoutEffect(() => {
    const update = () => setWidth(ref.current?.offsetWidth || 0);
    update();
    window.addEventListener("resize", update);
    return window.removeEventListener("size", update);
  }, [ref]);

  return width;
}
