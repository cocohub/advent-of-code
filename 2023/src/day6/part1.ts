const input = (await Bun.file('src/day6/input.txt').text()).split('\n');

const times = input[0].split(':')[1].match(/\d+/g)!.map(Number);
const distances = input[1].split(':')[1].match(/\d+/g)!.map(Number);

let ways: number[] = [];

// For each race, calculate the different number of ways that you could beat the record
for (let i = 0; i < times.length; i++) {
  const time = times[i];
  const distance = distances[i];
  let count = 0;

  // Hold down the button for 0 -race duration and see how far the boat gets
  for (let ii = 1; ii < time; ii++) {
    const distanceTraveled = ii * (time - ii);
    if (distanceTraveled > distance) {
      count += 1;
    }
  }

  ways.push(count);
}

const sum = ways.slice(1).reduce((acc, curr) => acc * curr, ways[0]);

console.log(sum);
