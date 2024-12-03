export const sum = arr => arr.reduce((a , b) => a + b);

export const product = arr => arr.reduce((a, b) => a * b, 1);

export const isBetween = (val, min, max) => val > min && val < max;