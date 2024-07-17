import { RefObject, useEffect, useState } from "react";

/**
 * Custom React hook that measures the height of a given HTMLElement using a RefObject.
 * Updates and returns the height when the element's height changes.
 *
 * @param ref - RefObject that points to the HTMLElement whose height needs to be measured
 * @returns The height of the HTMLElement
 */
const useMeasureHeight = (ref: RefObject<HTMLElement>) => {
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      const newHeight = element.offsetHeight;

      if (height !== newHeight) {
        setHeight(newHeight);
      }
    }
  }, [ref, height]);

  return height;
};

export default useMeasureHeight;
