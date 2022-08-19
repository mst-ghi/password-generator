export const CharsString = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~:/?#[]@!$&'()*+,;=`;

export const CharsArray = CharsString.split("");

export const randomString = (length = 36) => {
  const result = [];
  while (length--) {
    result.push(
      CharsString.charAt(Math.floor(Math.random() * CharsString.length))
    );
  }
  return result.join("");
};
