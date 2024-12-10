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
    if (card !== 'J') {
      const cardValue = cardValues[card];

      if (cardValue > highestValue) {
        highestValue = cardValue;
        highestCard = card;
      }
    }
  }

  return highestCard!;
}

function getMostOccurringCard(cards: CardLabel[]) {
  const { occurrences } = getOccurences(cards);

  // Sort object by value and return as [key, value] array
  const sortedOccurrences = Object.entries(occurrences).sort(
    (a, b) => (b[1] || 0) - (a[1] || 0)
  );

  return sortedOccurrences as [CardLabel, number][];
}

const replaceCards = (cards: CardLabel[], card: CardLabel) => {
  return cards.map((c) => {
    if (c === 'J') {
      return card;
    }
    return c;
  });
};

const findHighestCombo = (cards: CardLabel[]) => {
  const wildCards = cards.filter((c) => c === 'J');

  if (!wildCards.length) {
    return cards;
  }

  const highestCard = getHighestCard(cards);
  const mostOccurring = getMostOccurringCard(cards).filter((card) => {
    return card[0] !== 'J';
  });

  if (
    mostOccurring?.[0]?.[1] &&
    mostOccurring?.[1]?.[1] &&
    mostOccurring[0][1] === mostOccurring[1][1]
  ) {
    const newCards = replaceCards(cards, highestCard);
    return newCards;
  }

  const mostOccurringCard = mostOccurring?.[0]?.[0];
  const newCards = replaceCards(cards, mostOccurringCard);
  return newCards ?? cards;
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

const getOccurences = (cards: CardLabel[]) => {
  const occurrences: { [key in CardLabel]?: number } = {};

  for (const card of cards) {
    if (occurrences[card]) {
      occurrences[card]! += 1;
    } else {
      occurrences[card] = 1;
    }
  }

  const uniqueCards = new Set(cards);
  const uniqueCount = uniqueCards.size;

  const sortedOccurrences = Object.values(occurrences).sort(
    (a, b) => (b || 0) - (a || 0)
  );

  return { occurrences, uniqueCount, sortedOccurrences };
};

function assignHandValue({ cards }: Hand) {
  const newCards = findHighestCombo(cards);

  const { uniqueCount, sortedOccurrences } = getOccurences(newCards);

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
    const valueA = cardValues[a[i]];
    const valueB = cardValues[b[i]];

    if (valueA !== valueB) {
      return valueA - valueB;
    }
  }

  return b.length - a.length;
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

let sum = 0;

hands.forEach(({ bid }, i) => {
  sum += bid * (i + 1);
});

console.log(sum);
