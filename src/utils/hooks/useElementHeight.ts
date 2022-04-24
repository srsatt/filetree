import React, { useLayoutEffect, useState } from "react";

export const useElementHeight = (
  elementRef: React.RefObject<HTMLDivElement>
): number => {
  const [height, setHeight] = useState(0);
  useLayoutEffect(() => {
    const { current } = elementRef;
    if (current) {
      const { height } = current.getBoundingClientRect();
      setHeight(height);
      const resizeObserver = new ResizeObserver(([element]) => {
        if (element) {
          setHeight(element.contentRect.height);
        }
      });
      resizeObserver.observe(current);
      return () => {
        resizeObserver.unobserve(current);
      };
    }
  }, [elementRef]);
  return height;
};
