import { useEffect, useState } from 'react';

import KeyboardKey from './KeyboardKey';
import { defaultLayout } from '../../utils/layout';
import { defaultKeysSymbols } from '../../utils/keysSymbols';
import { KeysColors, KeysClasses, KeysSymbols } from '../../types';
import { capsCheck, spacebarCheck } from '../../utils/keyChecks';

interface Props {
  className?: string;
  keyColGap?: number;
  keyRowGap?: number;
  layout?: string[];
  keysSymbols?: KeysSymbols;
  keysColors?: KeysColors;
  keysClasses?: KeysClasses;
  allowPhysicalKeyboard?: boolean;
  onKeyClick: (keyboardKey: string) => void;
}

const CustomKeyboard = ({
  keyColGap = 0,
  keyRowGap = 0,
  layout = defaultLayout,
  keysSymbols = defaultKeysSymbols,
  className = '',
  keysColors,
  keysClasses,
  allowPhysicalKeyboard = true,
  onKeyClick,
}: Props) => {
  const [isCaps, setIsCaps] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      setIsCaps(event.getModifierState('CapsLock'));
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleKeyClick = (keyboardKey: string) => {
    if (capsCheck(keyboardKey)) {
      setIsCaps((prevState) => !prevState);
      return;
    }

    if (spacebarCheck(keyboardKey)) {
      onKeyClick(' ');
      return;
    }

    onKeyClick(isCaps ? keyboardKey.toUpperCase() : keyboardKey);
  };

  const classNameToRender = (): string => {
    return `m-1 flex flex-col ${className}`.trim();
  };

  const rowStylesToRender = (): React.CSSProperties | undefined => {
    const styles: React.CSSProperties | undefined = { gap: `${keyRowGap}rem` };

    return styles;
  };

  const colStylesToRender = (): React.CSSProperties | undefined => {
    const styles: React.CSSProperties | undefined = { gap: `${keyColGap}rem` };

    return styles;
  };

  return (
    <div className={classNameToRender()} style={rowStylesToRender()}>
      {layout.map((row) => {
        return (
          <div
            className={`flex justify-around overflow-x-auto`}
            style={colStylesToRender()}
            key={row}
          >
            {row.split(' ').map((keyboardKey, index) => (
              <KeyboardKey
                allowPhysicalKeyboard={allowPhysicalKeyboard}
                key={index}
                keysClasses={keysClasses}
                keysColors={keysColors}
                keysSymbols={keysSymbols}
                keyboardKey={isCaps ? keyboardKey.toUpperCase() : keyboardKey}
                onClick={handleKeyClick}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default CustomKeyboard;
