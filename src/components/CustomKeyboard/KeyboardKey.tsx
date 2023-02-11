import { useCallback, useEffect } from 'react';
import { KeysColors, KeysClass } from '../../types';

interface Props {
  keyboardKey: string;
  backspaceKeySymbol: string;
  enterKeySymbol: string;
  showBackspaceKeyAsSymbol: boolean;
  showEnterKeyAsSymbol: boolean;
  keysColors: KeysColors;
  keysClass: KeysClass;
  allowPhysicalKeyboard: boolean;
  onClick: (keyboardKey: string) => void;
}

const KeyboardKey = ({
  keyboardKey,
  backspaceKeySymbol,
  enterKeySymbol,
  showBackspaceKeyAsSymbol,
  showEnterKeyAsSymbol,
  keysColors,
  keysClass,
  allowPhysicalKeyboard,
  onClick,
}: Props) => {
  const handleUserKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const { key } = event;
      if (key.toLowerCase() === keyboardKey.toLowerCase()) {
        onClick(keyboardKey);
      }
    },
    [onClick, keyboardKey]
  );

  useEffect(() => {
    if (!allowPhysicalKeyboard) return;
    window.addEventListener('keydown', handleUserKeyPress);
    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
    };
  }, [handleUserKeyPress, allowPhysicalKeyboard]);

  const keyboardKeyToRender = (): string => {
    switch (keyboardKey) {
      case 'enter':
        return showEnterKeyAsSymbol ? enterKeySymbol : 'enter';
      case 'backspace':
        return showBackspaceKeyAsSymbol ? backspaceKeySymbol : 'backspace';
      default:
        return keyboardKey;
    }
  };

  const classNameToRender = (): string => {
    const classToAdd = keysClass?.[keyboardKey] || '';

    return `w-full m-0.5 rounded bg-neutral-800 p-1 text-neutral-100 hover:opacity-95 hover:drop-shadow ${classToAdd}`.trim();
  };

  const stylesToRender = (): React.CSSProperties | undefined => {
    const styles: React.CSSProperties | undefined = {};

    if (keysColors && keysColors[keyboardKey]) {
      styles.color = keysColors[keyboardKey].textColor;
      styles.backgroundColor = keysColors[keyboardKey].buttonColor;
    }

    return styles;
  };

  return (
    <button
      className={classNameToRender()}
      style={stylesToRender()}
      onClick={() => onClick(keyboardKey)}
      onMouseDown={(e) => e.preventDefault()}
    >
      {keyboardKeyToRender()}
    </button>
  );
};

export default KeyboardKey;
