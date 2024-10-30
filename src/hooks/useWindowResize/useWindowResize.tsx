import { useState, useLayoutEffect } from 'react';

/**
 * Custom React hook that tracks and returns the current window size.
 * @returns {number[]} An array containing the width and height of the window.
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
