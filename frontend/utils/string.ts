export function isNumeric(value: string | null) {
  return value !== null && /^-?\d+$/.test(value);
}

export function isPositiveNumeric(value: string | null) {
  return value !== null && /^(0*[1-9]\d*)$/.test(value);
}

export function getNameFromEmail(email?: string) {
  return email?.split("@")[0];
}

export function getInitialFromEmail(email?: string) {
  return email?.charAt(0).toUpperCase();
}
