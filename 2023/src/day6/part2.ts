const input = (await Bun.file('src/day6/input.txt').text()).split('\n');

const time = parseInt(input[0].split(':')[1].match(/\d+/g)!.join(''));
const distance = parseInt(input[1].split(':')[1].match(/\d+/g)!.join(''));

let count = 0;

for (let i = 1; i <= time; i++) {
  const distanceTraveled = i * (time - i);

  if (distanceTraveled > distance) {
    count += 1;
  }
}

console.log(count);
