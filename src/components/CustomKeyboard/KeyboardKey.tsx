import { useCallback, useEffect } from 'react';
import { KeysColors, KeysClasses, KeysSymbols } from '../../types';

interface Props {
  keyboardKey: string;
  keysSymbols: KeysSymbols;
  keysColors: KeysColors;
  keysClasses: KeysClasses;
  allowPhysicalKeyboard: boolean;
  onClick: (keyboardKey: string) => void;
}

const KeyboardKey = ({
  keyboardKey,
  keysSymbols,
  keysColors,
  keysClasses,
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
    if (keysSymbols && keysSymbols[keyboardKey]) {
      return keysSymbols[keyboardKey];
    }

    return keyboardKey;
  };

  const classNameToRender = (): string => {
    const classToAdd = keysClasses?.[keyboardKey] || '';

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
