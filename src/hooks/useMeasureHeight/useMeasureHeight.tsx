import { RefObject, useEffect, useState } from "react";

/**
 * Custom hook to measure the height of a referenced HTML element.
 * Tracks and returns the height of the target element, updating whenever the height changes.
 * 
 * @param ref - A React reference to the HTML element whose height needs to be measured.
 * 
 * @returns The current height of the referenced element in pixels.
 * 
 * ### Usage:
 * Use `useMeasureHeight` to track the height of an element in your component.
 * 
 * - Pass a reference to an HTML element whose height you want to observe.
 * - The hook will return the height, updating automatically if the height changes.
 * 
 * ### Example:
 * ```typescript
 * import { useRef } from 'react';
 * import useMeasureHeight from './hooks/useMeasureHeight';
 * 
 * const MyComponent = () => {
 *   const elementRef = useRef<HTMLDivElement>(null);
 *   const height = useMeasureHeight(elementRef);
 *   
 *   return (
 *     <div>
 *       <div ref={elementRef}>Content to measure</div>
 *       <p>Element height: {height}px</p>
 *     </div>
 *   );
 * };
 * ```
 * 
 * @returns The current height of the referenced HTML element in pixels.
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
