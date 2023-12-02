const lines = (await Bun.file('src/day1/input.txt').text()).split('\n');

const numberMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

let sum = 0;

lines.forEach((line) => {
  line = line.replace('eighthree', 'eightthree');
  line = line.replace('eightwo', 'eighttwo');
  line = line.replace('sevenine', 'sevennine');
  line = line.replace('oneight', 'oneeight');
  line = line.replace('threeight', 'threeeight');
  line = line.replace('fiveight', 'fiveeight');
  line = line.replace('nineight', 'nineeight');
  line = line.replace('twone', 'twoone');

  const processedLine = line.replace(
    /(one|two|three|four|five|six|seven|eight|nine)/gi,
    (matched) => {
      return String(numberMap[matched as keyof typeof numberMap]);
    }
  );
  const digits = processedLine.replace(/\D/g, '');
  const chars = Array.from(digits);
  const extract = parseInt(chars[0] + chars[chars.length - 1]);

  sum += extract;
});

console.log(sum);
