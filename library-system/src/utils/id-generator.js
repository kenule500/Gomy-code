import { createHash } from 'node:crypto';

let counter = 0;

export function generateId(prefix = 'ID') {
  counter += 1;
  const hash = createHash('md5')
    .update(`${prefix}-${Date.now()}-${counter}-${Math.random()}`)
    .digest('hex')
    .slice(0, 8);
  return `${prefix}-${hash}`;
}

export function generateShortId(prefix = 'S') {
  counter += 1;
  return `${prefix}${Date.now().toString(36).slice(-6)}${counter}`;
}

export function resetCounter() {
  counter = 0;
}