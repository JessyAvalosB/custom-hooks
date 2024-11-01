import { useState, useEffect, RefObject } from 'react';
import { Callbacks, Options } from './useElementDetector.interface';


/**
 * Custom hook to detect element visibility within the viewport using `IntersectionObserver`.
 * @param ref - Reference to the target HTML element.
 * @param options - Configuration options for `IntersectionObserver`, including `threshold` and `rootMargin`.
 * @param callbacks - Callback functions triggered on visibility changes.
 * 
 * ### Usage:
 * Use `useElementDetector` to monitor if an element is visible in the viewport and trigger specific actions.
 * 
 * - Triggers `onTriggerEnter` when the element first becomes visible.
 * - Triggers `onFirstVisible` the first time the element becomes visible.
 * - Triggers `onTriggerExit` when the element exits the viewport.
 * - Calls `onChangeVisibility` on every visibility change.
 * 
 * ### Example:
 * ```typescript
 * import useElementDetector from './hooks/useElementDetector';
 * import { useRef } from 'react';
 * 
 * const MyComponent = () => {
 *   const ref = useRef<HTMLDivElement>(null);
 *   const isVisible = useElementDetector(ref, 
 *     { threshold: 0.5, rootMargin: -10 }, 
 *     {
 *       onTriggerEnter: () => console.log("Entered viewport"),
 *       onFirstVisible: () => console.log("Visible for the first time"),
 *       onTriggerExit: () => console.log("Exited viewport"),
 *       onChangeVisibility: (isVisible) => console.log(`Visibility changed: ${isVisible}`)
 *     }
 *   );
 *   
 *   return <div ref={ref}>Check if I am visible</div>;
 * };
 * ```
 * 
 * @param ref - A `RefObject` pointing to the element to observe.
 * @param options - Options for the `IntersectionObserver`, with:
 *   - `threshold`: Number between 0 and 1, defaulting to 0. Throws an error if greater than 1.
 *   - `rootMargin`: Margin around the viewport for triggering visibility, in pixels.
 * @param callbacks - Object with optional callbacks:
 *   - `onTriggerEnter`: Called when the element becomes visible in the viewport.
 *   - `onFirstVisible`: Called only the first time the element becomes visible.
 *   - `onTriggerExit`: Called when the element exits the viewport.
 *   - `onChangeVisibility`: Called on every visibility change, with current visibility and `ref`.
 * 
 * @returns `boolean` indicating whether the element is currently visible.
 * 
 * @throws Error if `options.threshold` is greater than 1.
 */
const useElementDetector = (
  ref: RefObject<HTMLElement>,
  options?: Options,
  callbacks?: Callbacks
): boolean => {
  const [isVisible, setIsVisible] = useState(false);
  const [firstVisible, setFirstVisible] = useState(false);

  if (options?.threshold && options.threshold > 1) {
    throw new Error('{threshold} must be between 0 and 1');
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        setIsVisible(isIntersecting);

        if (isIntersecting) {
          callbacks?.onTriggerEnter?.(ref);
          if (!firstVisible) {
            setFirstVisible(true);
            callbacks?.onFirstVisible?.(ref);
          }
        } else {
          callbacks?.onTriggerExit?.(ref);
        }

        callbacks?.onChangeVisibility?.(isIntersecting, ref);
      },
      {
        threshold: options?.threshold || 0,
        rootMargin: `${options?.rootMargin || 0}px 0px 0px 0px`,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, firstVisible]);

  return isVisible;
};

export default useElementDetector;