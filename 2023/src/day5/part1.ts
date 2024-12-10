const extractData = (lines: string[]) => {
  let found = false;
  const dataArray: number[][][] = [];
  let tmp: number[][] = [];

  for (let i = 0; i < lines.length; i++) {
    if (found && lines[i].trim() !== '') {
      const data = lines[i].split(' ').map(Number);
      tmp.push(data);
    } else if (lines[i].includes('-')) {
      found = true;
    } else if (found && lines[i].trim() === '') {
      dataArray.push(tmp);
      found = false;
      tmp = [];
    }
  }

  dataArray.push(tmp);

  return dataArray;
};

const input = (await Bun.file('src/day5/input.txt').text()).split('\n');
const seeds = input[0].split(':')[1].match(/\d+/g)!.map(Number);
const data = extractData(input);
console.log(data);
const paths: Record<string, number[]> = {};
seeds /* .slice(0, 1) */
  .forEach((seed, sIndex) => {
    paths[sIndex] = [seed];

    data /* .slice(0, 1) */
      .forEach((map, mIndex) => {
        const id = paths[sIndex][mIndex];
        // destination, source, range
        // In the map, find the range that contains the seed id
        for (let i = 0; i < map.length; i++) {
          const [dest, source, range] = map[i];
          // If seed id is in range of start and end of range
          if (id >= source && id <= source + range - 1) {
            // Calculate the difference between the seed id and the start of the range
            const diff = id - source;
            // Use the difference to find the id of the destination
            paths[sIndex].push(dest + diff);
            break;
          } else if (i === map.length - 1) {
            paths[sIndex].push(id);
          }
        }
      });
  });

const locations = Object.values(paths).map((path) => path[path.length - 1]);
console.log(Math.min(...locations));
