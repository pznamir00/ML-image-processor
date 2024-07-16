import { useEffect, useState } from "react";
import { Image } from "../../types/image.type";

export default function useDistinctClasses<T extends Image>(
  images: T[],
  getClassFromImage: (image: T) => string[],
) {
  const [classes, setClasses] = useState<string[]>([]);

  useEffect(() => {
    const allClasses = images.map(getClassFromImage).flat();
    const distinctClasses = Array.from(new Set(allClasses));
    const distinctNonEmptyClasses = distinctClasses.filter(Boolean);
    setClasses(distinctNonEmptyClasses);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  return classes;
}
