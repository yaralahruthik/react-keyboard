import KeyboardKey from './KeyboardKey';

import { defaultLayout } from '../../utils/layout';
import { KeyColors, KeysClass } from '../../types';

interface Props {
  className?: string;
  keyColGap?: number;
  keyRowGap?: number;
  layout?: string[];
  backspaceKeySymbol?: string;
  showBackspaceKeyAsSymbol?: boolean;
  showEnterKeyAsSymbol?: boolean;
  enterKeySymbol?: string;
  keysColors?: KeyColors;
  keysClass?: KeysClass;
  allowPhysicalKeyboard?: boolean;
  onKeyClick: (keyboardKey: string) => void;
}

const CustomKeyboard = ({
  keyColGap = 0,
  keyRowGap = 0,
  layout = defaultLayout,
  backspaceKeySymbol = '⌫',
  showBackspaceKeyAsSymbol = true,
  showEnterKeyAsSymbol = true,
  enterKeySymbol = '↵',
  className = '',
  keysColors,
  keysClass,
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
                keysClass={keysClass}
                keysColors={keysColors}
                showBackspaceKeyAsSymbol={showBackspaceKeyAsSymbol}
                showEnterKeyAsSymbol={showEnterKeyAsSymbol}
                backspaceKeySymbol={backspaceKeySymbol}
                enterKeySymbol={enterKeySymbol}
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
