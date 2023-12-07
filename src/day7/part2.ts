// const input = (await Bun.file('src/day7/input-example.txt').text()).split('\n');
const input = (await Bun.file('src/day7/input.txt').text()).split('\n');

type CardLabel =
  | 'A'
  | 'K'
  | 'Q'
  | 'J'
  | 'T'
  | '9'
  | '8'
  | '7'
  | '6'
  | '5'
  | '4'
  | '3'
  | '2';

const cardValues: { [key in CardLabel]: number } = {
  A: 14,
  K: 13,
  Q: 12,
  T: 10,
  '9': 9,
  '8': 8,
  '7': 7,
  '6': 6,
  '5': 5,
  '4': 4,
  '3': 3,
  '2': 2,
  J: 1,
};

type Hand = {
  cards: CardLabel[];
  bid: number;
};

const rankValues: { [key: string]: number } = {
  'Five of a kind': 8,
  'Four of a kind': 7,
  'Full house': 6,
  'Three of a kind': 5,
  'Two pair': 4,
  'One pair': 3,
  'High card': 2,
};

function getHighestCard(cards: CardLabel[]) {
  let highestCard: CardLabel | undefined;
  let highestValue = 0;

  for (const card of cards) {
    const cardValue = cardValues[card];

    if (cardValue > highestValue) {
      highestValue = cardValue;
      highestCard = card;
    }
  }

  return highestCard!;
}

const findHighestCombo = (cards: CardLabel[]) => {
  const wildCards = cards.filter((card) => card === 'J');

  if (wildCards.length) {
    const highestCard = getHighestCard(cards);

    const newCards = cards.map((card) => {
      if (card === 'J') {
        return highestCard;
      }
      return card;
    });

    return newCards;
  }

  return cards;
};

const returnHandValueResult = (
  rankString: keyof typeof rankValues,
  newCards: CardLabel[]
) => {
  return {
    rank: rankValues[rankString],
    rankString,
    withWildCards: newCards,
  };
};

function assignHandValue({ cards }: Hand) {
  const occurrences: { [key in CardLabel]?: number } = {};

  const newCards = findHighestCombo(cards);

  for (const card of newCards) {
    if (occurrences[card]) {
      occurrences[card]! += 1;
    } else {
      occurrences[card] = 1;
    }
  }

  const uniqueCards = new Set(newCards);
  const uniqueCount = uniqueCards.size;

  const sortedOccurrences = Object.values(occurrences).sort(
    (a, b) => (b || 0) - (a || 0)
  );

  if (sortedOccurrences[0] === 5) {
    return returnHandValueResult('Five of a kind', newCards);
  } else if (sortedOccurrences[0] === 4) {
    return returnHandValueResult('Four of a kind', newCards);
  } else if (sortedOccurrences[0] === 3 && sortedOccurrences[1] === 2) {
    return returnHandValueResult('Full house', newCards);
  } else if (sortedOccurrences[0] === 3) {
    return returnHandValueResult('Three of a kind', newCards);
  } else if (uniqueCount === 3) {
    return returnHandValueResult('Two pair', newCards);
  } else if (uniqueCount === 4) {
    return returnHandValueResult('One pair', newCards);
  } else {
    return returnHandValueResult('High card', newCards);
  }
}

function compareCards(a: CardLabel[], b: CardLabel[]): number {
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    // console.log('comparing', a, b);

    const valueA = cardValues[a[i]];
    const valueB = cardValues[b[i]];

    /* console.log('card value a', a[i], valueA);
    console.log('card value b', b[i], valueB); */

    if (valueA !== valueB) {
      // console.log('returning because of matching');
      return valueA - valueB;
    }
  }

  // console.log('no match');
  return b.length - a.length; // If all labels are equal, shorter array wins
}

const hands = input.map((hand) => {
  const [rawCards, rawBid] = hand.split(' ');
  const cards = rawCards.split('') as CardLabel[];
  const bid = parseInt(rawBid);

  return { cards, bid, rank: assignHandValue({ cards, bid }) };
});

hands.sort((a, b) => {
  if (a.rank.rank !== b.rank.rank) {
    return a.rank.rank - b.rank.rank; // Sort by rank first
  } else {
    return compareCards(a.cards, b.cards);
  }
});

// console.log(hands);

let sum = 0;

hands.forEach(({ cards, bid, rank }, i) => {
  console.log(
    i + 1,
    cards.join(''),
    rank.withWildCards.join(''),
    rank.rankString,
    bid
  );
  sum += bid * (i + 1);
});

console.log('\n');
if (sum === 5905) {
  console.log('correct!!!');
} else {
  console.log('wrong!!!');
}

console.log(sum);
