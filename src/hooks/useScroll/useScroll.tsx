import { useEffect, useState } from "react"

/**
 * Custom hook to track the scroll position of an element or the window.
 * 
 * @param {HTMLElement | null} [element=null] Optional element to monitor; if no element is provided, it defaults to tracking the window scroll.
 * 
 * @returns {{
*   scrollX: number;
*   scrollY: number;
* }}
* - `scrollX` {number} - Current horizontal scroll position of the target.
* - `scrollY` {number} - Current vertical scroll position of the target.
* 
* @example
* const { scrollX, scrollY } = useScroll();  // Track window scroll
* 
* // Or, to track scroll on a specific element:
* const ref = useRef(null);
* const { scrollX, scrollY } = useScroll(ref.current);
* 
* return (
*   <div ref={ref}>
*     <p>Horizontal scroll: {scrollX}</p>
*     <p>Vertical scroll: {scrollY}</p>
*   </div>
* );
*/
const useScroll = (element: HTMLElement | null = null) => {
    const [scrollPosition, setScrollPosition] = useState({
        scrollX: 0,
        scrollY: 0,
    });

    useEffect(() => {
        const target = element || window;

        const handleScroll = () => {
            setScrollPosition({
                scrollX: element ? element.scrollLeft : window.scrollX,
                scrollY: element ? element.scrollTop : window.screenY,
            });
        };

        target.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => target.removeEventListener('scroll', handleScroll);
    }, [element]);

    return scrollPosition;
}

export default useScroll;