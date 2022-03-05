import { useMemo } from 'react';
/**
 * Calculates the maximum number of characters that can be fit into give maxwidth.
 * Calculates the width of text with given font family via ref object, in terms of px
 *
 * @param {Ref} ref
 * @param {number} maxWidth
 * @param {string} middleChars i.e. '...' ellipsis
 * @return number of chars of ref's text, including number of chars of given/default
 * returned value is an odd number, first part has +1 characters
 */

// create canvas element, and get its content
const getContext = () => {
  const fragment = document.createDocumentFragment();
  const canvas = document.createElement('canvas');
  fragment.appendChild(canvas);
  return canvas.getContext('2d');
};

const useFitCharacterNumber = (options) => {
  const { ref, maxWidth, middleChars } = options;
  return useMemo(() => {
    if (ref.current?.textContent && maxWidth) {
      const context = getContext();
      const computedStyles = window.getComputedStyle(ref.current);
      context.font = computedStyles.font
        ? computedStyles.font
        : `${computedStyles.fontSize}" "${computedStyles.fontFamily}`;
      const textWidth = context.measureText(ref.current.textContent).width; // width of text
      let fitLength = ref.current.textContent.length;
      let prefix = ''; // char from start
      let suffix = ''; // char from end
      let i = 0;
      let j = fitLength - 1;
      let current = middleChars || ''; // i.e. '...'
      let prev = current;
      while (i < j) {
        prefix = prefix + ref.current.textContent.charAt(i);
        current = prefix + middleChars + suffix;
        if (context.measureText(current).width > maxWidth) {
          fitLength = prev.length;
          break;
        }
        prev = current;
        suffix = ref.current.textContent.charAt(j) + suffix;
        current = prefix + middleChars + suffix;
        if (context.measureText(current).width > maxWidth) {
          fitLength = prev.length;
          break;
        }
        prev = current;
        i++;
        j--;
      }
      return { textWidth, charNumber: fitLength };
    }
    return { textWidth: NaN, charNumber: NaN };
  }, [ref, maxWidth, middleChars]);
};

export default useFitCharacterNumber;
