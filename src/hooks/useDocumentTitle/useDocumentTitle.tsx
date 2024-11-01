import { useEffect } from "react";

/**
 * Custom hook to set the document title in a React component.
 * @param title The title string to be set as the document's title.
 * 
 * ### Usage:
 * Call `useDocumentTitle` within a functional component to dynamically change the document title.
 * 
 * - If the `title` contains "undefined" (case-insensitive), the hook does not update the document title.
 * - Otherwise, it sets the document title to the text you sent.
 * 
 * ### Example:
 * ```typescript
 * import useDocumentTitle from './hooks/useDocumentTitle';
 * 
 * const MyComponent = () => {
 *   useDocumentTitle("My Page Title");
 * 
 *   return <div>Check the document title!</div>;
 * };
 * ```
 * 
 * @returns void
 */
const useDocumentTitle = (title: string): void => {
  useEffect(() => {
    if (title.toLowerCase().includes("undefined")) return;
    document.title = title;
  }, [title]);
};

export default useDocumentTitle;