const schematicText = await Bun.file('src/day3/input.txt').text();
const schematicLines = schematicText.split('\n');
const schematic = schematicLines.map((row) => row.split(''));

let sum = 0;

interface Part {
  x: number;
  y: number;
}

// Map every non digit, except for . to #
schematic.forEach((row) => {
  row.forEach((cell, index) => {
    if (cell !== '.' && Number.isNaN(parseInt(cell))) {
      row[index] = '#';
    }
  });
});

// Map positions to full numbers to cross reference with adjacent numbers
const regex = /\b(\d+)\b/g;
const matrix: Record<string, Record<string, string>> = {};
let match: RegExpExecArray | null;

schematicLines.forEach((line, y) => {
  while ((match = regex.exec(line)) !== null) {
    const keys = Array.from(
      { length: match[0].length },
      (_, index) => (match?.index as number) + index
    );

    matrix[y] = {
      ...matrix[y],
      ...keys.reduce((obj: Record<string, string>, key: number) => {
        obj[key] = match?.[0] as string;
        return obj;
      }, {}),
    };
  }
});

// Extract numbers from the input and their positions
const numberMap = schematic
  .map((row, y) =>
    row.map((cell, x) => {
      const number = parseInt(cell);

      return Number.isNaN(number)
        ? null
        : {
            x,
            y,
          };
    })
  )
  .flat()
  .filter((cell) => cell !== null) as Part[];

numberMap.forEach((point: Part) => {
  const { x, y } = point;

  // Check if the number is adjacent to any non-digit characters
  const isAdjacent =
    schematic[y - 1]?.[x - 1] === '#' ||
    schematic[y - 1]?.[x] === '#' ||
    schematic[y - 1]?.[x + 1] === '#' ||
    schematic[y]?.[x - 1] === '#' ||
    schematic[y]?.[x + 1] === '#' ||
    schematic[y + 1]?.[x - 1] === '#' ||
    schematic[y + 1]?.[x] === '#' ||
    schematic[y + 1]?.[x + 1] === '#';

  if (isAdjacent) {
    const number = parseInt(matrix?.[y]?.[x]);

    if (Number.isInteger(number)) {
      sum += number;

      const numLength = x + String(number).length;

      for (let i = x; i < numLength; i++) {
        if (matrix[y][i] === String(number)) {
          matrix[y][i] = 'skip';
        }
      }
    }
  }
});

// 517021

console.log(sum);
