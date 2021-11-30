export const getRandomNumber = (a = 0, b = 1) => {
  const lower = Math.min(a, b);
  const upper = Math.floor(Math.max(a, b));
  const number = (lower + Math.random() * (upper - lower + 1));

  if (number >= b) {
    return Math.floor(number);
  }

  return number.toFixed(1);
};
