const schematicText = await Bun.file('src/day3/input.txt').text();
const schematicLines = schematicText.split('\n');

let gearRatio = 0;

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

schematicLines.forEach((line, y) => {
  const matches = [...line.matchAll(/\*/g)];

  for (const match of matches) {
    let parts = [matrix[y], matrix[y - 1], matrix[y + 1]];

    const gears: any = [];

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      Object.entries(part ?? {}).forEach(([key, value]) => {
        const x = parseInt(key);

        if (
          x - 1 <= match.index! &&
          match.index! <= x + 1 &&
          value !== 'skip' &&
          gears[gears.length - 1] !== value
        ) {
          gears.push(value);

          const numLength = x + value.length;

          for (let ix = x; ix < numLength; ix++) {
            if (parts?.[i]?.[ix] === value) {
              parts[i][ix] = 'skip';
            }
          }
        }
      });
    }

    if (gears.length === 2) {
      gearRatio += parseInt(gears[0]) * parseInt(gears[1]);
    }
  }
});

console.log(gearRatio);

// Correct 81296995
