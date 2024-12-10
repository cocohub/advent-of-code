interface Card {
  id: number;
  winningNumbers: number[];
  pulledNumbers: number[];
  rewardCards: Card[];
  count: number;
}

const parse = (line: string): Card => {
  const [rawCardId, numbers] = line.split(': ');
  const [, idString] = rawCardId.split(/ +/);
  const [rawWinningNumbers, rawPulledNumbers] = numbers.split(' | ');
  const winningNumbers = rawWinningNumbers
    .split(/ +/g)
    .filter((l) => !!l)
    .map((n) => Number.parseInt(n, 10));
  const pulledNumbers = rawPulledNumbers
    .split(/ +/g)
    .filter((l) => !!l)
    .map((n) => Number.parseInt(n, 10));
  return {
    winningNumbers,
    id: Number.parseInt(idString, 10),
    pulledNumbers,
    rewardCards: [],
    count: 1,
  };
};

const input = await Bun.file('src/day4/input-example.txt').text();

let asd = 0;

const cards = input.split('\n').slice(0, 10).map(parse);
cards.forEach((card, cardIndex) => {
  // console.log(cardIndex);
  const pulledWinningNumbers = card.pulledNumbers.filter((pulledNumber) =>
    card.winningNumbers.includes(pulledNumber)
  ).length;

  // console.log(pulledWinningNumbers);
  for (let i = 1; i <= pulledWinningNumbers; i++) {
    // console.log(asd);
    asd += 1;
    const rewardCard = cards[cardIndex + i];
    if (rewardCard) {
      card.rewardCards.push(rewardCard);
    }
  }
});

// console.log(JSON.stringify(cards));

for (const card of cards) {
  for (const rewardCard of card.rewardCards) {
    // console.log(rewardCard.count + card.count);
    /* console.log(
      `${card.id}: ${card.count} + ${rewardCard.id}: ${rewardCard.count}`
    ); */
    rewardCard.count = rewardCard.count + card.count;
  }
}

// console.log(JSON.stringify(cards));

const count = cards.map((card) => {
  console.log(card.count);
  return card.count;
});
// console.log(count);

// console.log(count.reduce((a, b) => a + b, 0));

//5329815
