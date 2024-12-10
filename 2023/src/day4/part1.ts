const cards = (await Bun.file('src/day4/input.txt').text()).split('\n');

let sum = 0;

cards.forEach((card) => {
  const numbers = card.split(':')[1].split('|');
  const winningNumbers = numbers[0].match(/\d+/g)!;
  const cardNumbers = numbers[1].match(/\d+/g)!;

  console.log(winningNumbers);
  console.log(cardNumbers);

  let score = 0;

  cardNumbers.forEach((cardNumber) => {
    if (winningNumbers.includes(cardNumber)) {
      score = score * 2 || 1;
    }
  });

  sum += score;
});

console.log(sum);
