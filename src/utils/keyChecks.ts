export const spacebarCheck = (key: string) => {
  return ['space', 'spacebar'].includes(key.toLowerCase());
};

export const capsCheck = (key: string) => {
  return ['capslock', 'caps_lock'].includes(key.toLowerCase());
};
