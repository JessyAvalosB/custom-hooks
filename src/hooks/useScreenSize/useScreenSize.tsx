import { useState } from 'react';

declare const window: Window;

/**
 * Custom React hook that returns a boolean indicating whether the current window matches the specified media query.
 * @param query Optional media query string to match the window size against.
 * @returns Boolean value representing if the window matches the media query.
 */
const useScreenSize = (query?: string) => {
  if (typeof window !== 'undefined') {
    const mediaQuery = window.matchMedia(query ?? '(max-width: 450px)');
    const [match, setMatch] = useState<boolean>(mediaQuery.matches);
    mediaQuery.addEventListener('change', (event) => {
      setMatch(event.matches as boolean)
    });
    return match;
  }
};

export default useScreenSize;
