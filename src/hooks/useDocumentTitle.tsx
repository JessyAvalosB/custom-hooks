import { useEffect } from "react";

const useDocumentTitle = (title: string) => {
  useEffect(() => {
    if (title.toLowerCase().includes("undefined")) return;
    document.title = `Tiny Homes - ${title}`;
  }, [title]);
};

export default useDocumentTitle;