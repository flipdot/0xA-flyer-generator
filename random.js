
export function randomNumber(min, max) {
  return min + Math.random() * (max - min);
}

export function randomInt(min, max) {
  return min + Math.floor(Math.random() * Math.floor(max - min));
}

export function randomOption(options) {
  const selected = randomInt(0, options.length);
  return options[selected];
}
