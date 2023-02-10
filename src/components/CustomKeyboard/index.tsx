import KeyboardKey from './KeyboardKey';

import { defaultLayout } from '../../utils/layout';
import { Color } from '../../types/color';

interface Props {
  keyColGap?: number;
  keyRowGap?: number;
  layout?: string[];
  backspaceKeySymbol?: string;
  showBackspaceKeyAsSymbol?: boolean;
  showEnterKeyAsSymbol?: boolean;
  enterKeySymbol?: string;
  enterKeyColor?: Color;
}

const CustomKeyboard = ({
  keyColGap = 0,
  keyRowGap = 0,
  layout = defaultLayout,
  backspaceKeySymbol = '⌫',
  showBackspaceKeyAsSymbol = true,
  showEnterKeyAsSymbol = false,
  enterKeySymbol = '↵',
}: Props) => {
  const handleKeyClick = (keyboardKey: string) => {
    console.log(keyboardKey);
  };

  return (
    <div
      className={`m-1 flex flex-col border border-gray-700 gap-${keyRowGap}`}
    >
      {layout.map((row) => {
        return (
          <div className={`flex justify-around gap-${keyColGap}`} key={row}>
            {row.split(' ').map((keyboardKey) => (
              <KeyboardKey
                key={keyboardKey}
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
