const lines = (await Bun.file('src/day1/input.txt').text()).split('\n');

let sum = 0;

lines.forEach((line) => {
  const digits = line.replace(/\D/g, '');
  const chars = Array.from(digits);

  sum += parseInt(chars[0] + chars[chars.length - 1]);
});

console.log(sum);
