import { useEffect, useState } from "react";
import { ClassificationImage } from "../../../../../../types/image.type";

export default function useDistinctClasses(images: ClassificationImage[]) {
  const [classes, setClasses] = useState<string[]>([]);

  useEffect(() => {
    const distinctClasses = images.reduce<string[]>(
      (acc, img) =>
        img.metadata &&
        img.metadata.class !== "" &&
        !acc.includes(img.metadata.class)
          ? [...acc, img.metadata.class]
          : acc,
      [],
    );
    setClasses(distinctClasses);
  }, [images]);

  return classes;
}
