type Color = `#${string}`;

export type KeyColors =
  | { [keyboardKey: string]: { textColor: Color; buttonColor: Color } }
  | undefined;

export type KeysClass = { [keyboardKey: string]: string } | undefined;
