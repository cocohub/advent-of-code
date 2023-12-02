const games = (await Bun.file('src/day2/input.txt').text()).split('\n');

let sumPower = 0;

games.forEach((game) => {
  const line = game.split(':');
  const sets = line[1].trim().split(';');
  const maxCubes = {
    red: 0,
    green: 0,
    blue: 0,
  };

  sets.forEach((set) => {
    const cubes = set.trim().split(', ');

    cubes.forEach((cube) => {
      const cubeInfo = cube.split(' ');
      const count = parseInt(cubeInfo[0]);
      const color = cubeInfo[1] as keyof typeof maxCubes;

      if (count > maxCubes[color]) {
        maxCubes[color] = count;
      }
    });
  });

  sumPower += maxCubes.red * maxCubes.green * maxCubes.blue;
});

console.log(sumPower);
