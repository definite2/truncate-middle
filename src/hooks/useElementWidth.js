/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useLayoutEffect, useState } from 'react';
/**
 * Returns current width of specified element.
 *
 * @param {Ref} ref element to use in width calculation
 */
const useElementWidth = (ref) => {
  const [width, setWidth] = useState(0);

  const getWidth = useCallback(() => {
    return (
      ref?.current?.getBoundingClientRect().width *
        (window.visualViewport?.scale || 1) || 0
    );
  }, [ref?.current]);

  const elObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      if (entry.contentBoxSize) {
        setWidth(entry.contentRect.width);
      }
    }
  });
  useLayoutEffect(() => {
    setWidth(getWidth());
  }, [ref?.current]);

  useLayoutEffect(() => {
    if (!ref?.current) return;
    elObserver.observe(ref?.current);
    return () => {
      elObserver.disconnect();
    };
  });
  return width;
};

export default useElementWidth;
