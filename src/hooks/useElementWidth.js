/* eslint-disable react-hooks/rules-of-hooks */
import { useLayoutEffect, useState } from 'react';
/**
 * Returns current width of specified element.
 *
 * @param {Ref} ref element to use in width calculation
 */
const useElementWidth = (ref) => {
  const [width, setWidth] = useState(0);

  const elObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      if (entry.contentBoxSize) {
        setWidth(entry.contentRect.width);
      }
    }
  });

  useLayoutEffect(() => {
    if (!ref?.current) return;
    elObserver.observe(ref.current);
    return () => {
      elObserver.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return width;
};

export default useElementWidth;
