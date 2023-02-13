type Color = `#${string}`;

export type KeysColors =
  | { [keyboardKey: string]: { textColor: Color; buttonColor: Color } }
  | undefined;

export type KeysClasses = { [keyboardKey: string]: string } | undefined;
