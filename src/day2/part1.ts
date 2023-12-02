const games = (await Bun.file('src/day2/input.txt').text()).split('\n');

const configuration = {
  red: 12,
  green: 13,
  blue: 14,
};

let sumId = 0;

games.forEach((game) => {
  const line = game.split(':');
  const id = line[0].split(' ')[1].trim();
  const sets = line[1].trim().split(';');
  let isPossible = true;

  sets.forEach((set) => {
    const cubes = set.trim().split(', ');

    cubes.forEach((cube) => {
      const [count, color] = cube.split(' ');

      if (
        parseInt(count) > configuration[color as keyof typeof configuration]
      ) {
        isPossible = false;
      }
    });
  });

  if (isPossible) {
    sumId += parseInt(id);
  }
});

console.log(sumId);
