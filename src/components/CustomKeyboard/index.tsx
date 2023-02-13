import KeyboardKey from './KeyboardKey';

import { defaultLayout } from '../../utils/layout';
import { KeysColors, KeysClasses, KeysSymbols } from '../../types';
import { defaultKeysSymbols } from '../../utils/keysSymbols';

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
  const handleKeyClick = (keyboardKey: string) => {
    onKeyClick(keyboardKey);
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
            className={`flex justify-around`}
            style={colStylesToRender()}
            key={row}
          >
            {row.split(' ').map((keyboardKey) => (
              <KeyboardKey
                allowPhysicalKeyboard={allowPhysicalKeyboard}
                key={keyboardKey}
                keysClasses={keysClasses}
                keysColors={keysColors}
                keysSymbols={keysSymbols}
                keyboardKey={keyboardKey}
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
