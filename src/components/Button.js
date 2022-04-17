import React, { useLayoutEffect } from 'react';
import { useElementWidth, useFitCharacterNumber } from '../hooks';
import { truncateFromMiddle } from '../utils';

const Button = ({ originalLongText, width, font }) => {
  const btnRef = React.useRef();
  const [buttonText, setButtonText] = React.useState(originalLongText);
  const buttonWidth = useElementWidth(btnRef);
  const { textWidth, charNumber } = useFitCharacterNumber({
    ref: btnRef,
    maxWidth: buttonWidth,
    middleChars: '...',
  });
  useLayoutEffect(() => {
    if (btnRef && btnRef.current) {
      if (buttonWidth && charNumber && textWidth) {
        if (textWidth > buttonWidth)
          setButtonText(truncateFromMiddle(originalLongText, charNumber));
      }
    }
  }, [buttonWidth, charNumber, originalLongText, textWidth]);
  return (
    <div className="button-container">
      <button style={{ width: width, font: font }} ref={btnRef}>
        {buttonText}
      </button>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <pre
          style={{
            whiteSpace: 'pre-wrap',
          }}
        >
          {' '}
          {`original text: "${originalLongText}"`}
        </pre>
        <pre
          style={{
            whiteSpace: 'pre-wrap',
          }}
        >
          {' '}
          {`button content width = (button width - paddings - border width) = ${buttonWidth}px `}
        </pre>
        <pre
          style={{
            whiteSpace: 'pre-wrap',
          }}
        >
          {' '}
          {`button font style is: ${font}`}
        </pre>
      </div>
    </div>
  );
};

export default Button;
