export function required(value, fieldName) {
  if (value === undefined || value === null || value === '') {
    throw new Error(`${fieldName} is required.`);
  }
  return true;
}

export function isPositiveNumber(value, fieldName) {
  if (typeof value !== 'number' || value <= 0 || !Number.isFinite(value)) {
    throw new Error(`${fieldName} must be a positive number.`);
  }
  return true;
}

export function isNonNegativeNumber(value, fieldName) {
  if (typeof value !== 'number' || value < 0 || !Number.isFinite(value)) {
    throw new Error(`${fieldName} must be a non-negative number.`);
  }
  return true;
}

export function isString(value, fieldName) {
  if (typeof value !== 'string') {
    throw new Error(`${fieldName} must be a string.`);
  }
  return true;
}

export function matchesPattern(value, pattern, fieldName, message) {
  if (!pattern.test(value)) {
    throw new Error(message || `${fieldName} has an invalid format.`);
  }
  return true;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function email(value, fieldName = 'Email') {
  isString(value, fieldName);
  matchesPattern(value, EMAIL_PATTERN, fieldName, `${fieldName} "${value}" is not a valid email address.`);
  return true;
}

export function isbn(value) {
  isString(value, 'ISBN');
  const clean = value.replace(/[-\s]/g, '');
  if (!/^\d{10}|\d{13}$/.test(clean)) {
    throw new Error(`ISBN "${value}" must be 10 or 13 digits.`);
  }
  return true;
}