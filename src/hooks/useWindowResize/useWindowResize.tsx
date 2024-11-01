import { useState, useLayoutEffect } from 'react';

/**
 * Custom hook to get the current window dimensions and update them on window resize.
 * This hook listens for window resize events and provides the latest width and height of the window.
 *
 * @returns An array `[width, height]` representing the current width and height of the window.
 *
 * ### Usage:
 * Use `useWindowResize` to dynamically access window dimensions and trigger component re-renders when the window is resized.
 *
 * - Automatically updates window size values when the window is resized.
 * - Returns `[0, 0]` initially, then updates with actual window size after mounting.
 *
 * ### Example:
 * ```typescript
 * import useWindowResize from './hooks/useWindowResize';
 *
 * const MyResponsiveComponent = () => {
 *   const [width, height] = useWindowResize();
 *
 *   return (
 *     <div>
 *       <p>Current window width: {width}px</p>
 *       <p>Current window height: {height}px</p>
 *     </div>
 *   );
 * };
 * ```
 */
const useWindowResize = () => {
  const [size, setSize] = useState([0, 0]);

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
};

export default useWindowResize;
