type Color = `#${string}`;

export type KeysColors =
  | { [keyboardKey: string]: { textColor: Color; buttonColor: Color } }
  | undefined;

export type KeysClass = { [keyboardKey: string]: string } | undefined;
