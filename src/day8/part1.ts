const input = (await Bun.file('src/day8/input.txt').text()).split('\n');

let steps = input[0];
const lines = input.slice(2);
const map: Record<string, string[]> = {};

lines.forEach((line) => {
  const [key, tupleStr] = line.split(' = ');
  map[key] = tupleStr.substring(1, tupleStr.length - 1).split(', ');
});

let current = 'AAA';
let count = 0;

while (current !== 'ZZZ') {
  const step = steps[count % steps.length] === 'L' ? 0 : 1;
  current = map[current][step];
  count += 1;
}

console.log(count);
