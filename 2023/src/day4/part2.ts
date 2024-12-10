const cards = (await Bun.file('src/day4/input-example.txt').text()).split('\n');

const getCardId = (card: string) => {
  return card.split(':')[0].match(/\d+/g)![0];
};

const rewards: Record<string, number> = {};
cards.forEach((card) => {
  const cardId = getCardId(card);
  rewards[cardId] = 1;
});

cards /* .slice(0, 1) */
  .forEach((card, cardIndex) => {
    const numbers = card.split(':')[1].split('|');
    const winningNumbers = numbers[0].match(/\d+/g)!;
    const cardNumbers = numbers[1].match(/\d+/g)!;
    let matches = 0;

    cardNumbers.forEach((cardNumber) => {
      if (winningNumbers.includes(cardNumber)) {
        matches += 1;
      }
    });

    // console.log(cardNumbers);

    for (let i = 1; i <= matches; i++) {
      const rewardCard = cards[cardIndex + i];
      const rewardCardId = getCardId(rewardCard);
      // console.log(rewardCardId);

      if (rewardCard) {
        rewards[rewardCardId] += 1;
      }
    }
  });

console.log(rewards);

let sum = 0;

/* for (const rewardCard of rewards) {
  rewardCard.count = rewardCard.count + card.count;
} */

console.log(Object.values(rewards).reduce((a, b) => a + b, 0));
// console.log(rewards.reduce((a, b) => a + b, 0) === 5329815);
