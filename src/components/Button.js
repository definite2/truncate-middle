import React, { useEffect } from 'react';
import { useElementWidth, useFitCharacterNumber } from '../hooks';
import { truncateFromMiddle } from '../utils';

const Button = ({ originalLongText, width }) => {
  const btnRef = React.useRef();
  const [buttonText, setButtonText] = React.useState(originalLongText);
  const buttonWidth = useElementWidth(btnRef);
  const { textWidth, charNumber } = useFitCharacterNumber({
    ref: btnRef,
    maxWidth: buttonWidth,
    middleChars: '...',
  });
  useEffect(() => {
    if (btnRef && btnRef.current) {
      if (buttonWidth && charNumber && textWidth) {
        if (textWidth > buttonWidth)
          setButtonText(truncateFromMiddle(originalLongText, charNumber));
      }
    }
  }, [buttonWidth, charNumber, originalLongText, textWidth]);
  return (
    <div className="button-container">
      <button style={{ width: width }} ref={btnRef}>
        {buttonText}
      </button>
      <pre style={{ whiteSpace: 'pre-wrap' }}>
        {' '}
        {`original text: ${originalLongText} `}
      </pre>
    </div>
  );
};

export default Button;
