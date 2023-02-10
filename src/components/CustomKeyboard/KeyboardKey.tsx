import { useCallback, useEffect } from 'react';

interface Props {
  keyboardKey: string;
  backspaceKeySymbol: string;
  enterKeySymbol: string;
  showBackspaceKeyAsSymbol: boolean;
  showEnterKeyAsSymbol: boolean;
  onClick: (keyboardKey: string) => void;
}

const KeyboardKey = ({
  keyboardKey,
  backspaceKeySymbol,
  enterKeySymbol,
  showBackspaceKeyAsSymbol,
  showEnterKeyAsSymbol,
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
    window.addEventListener('keydown', handleUserKeyPress);
    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

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

  return (
    <button
      className={`m-1 w-full rounded bg-neutral-800 p-1 text-lg text-neutral-100 hover:bg-neutral-700 hover:drop-shadow`}
      onClick={() => onClick(keyboardKey)}
      onMouseDown={(e) => e.preventDefault()}
    >
      {keyboardKeyToRender()}
    </button>
  );
};

export default KeyboardKey;
