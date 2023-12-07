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
  J: 11,
  T: 10,
  '9': 9,
  '8': 8,
  '7': 7,
  '6': 6,
  '5': 5,
  '4': 4,
  '3': 3,
  '2': 2,
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

function assignHandValue({ cards, bid }: Hand) {
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

  if (sortedOccurrences[0] === 5) {
    console.log(cards.join(''), 'Five of a kind', bid);
    return rankValues['Five of a kind'];
  } else if (sortedOccurrences[0] === 4) {
    console.log(cards.join(''), 'Four of a kind', bid);
    return rankValues['Four of a kind'];
  } else if (sortedOccurrences[0] === 3 && sortedOccurrences[1] === 2) {
    console.log(cards.join(''), 'Full house', bid);
    return rankValues['Full house'];
  } else if (sortedOccurrences[0] === 3) {
    console.log(cards.join(''), 'Three of a kind', bid);
    return rankValues['Three of a kind'];
  } else if (uniqueCount === 3) {
    console.log(cards.join(''), 'Two pair', bid);
    return rankValues['Two pair'];
  } else if (uniqueCount === 4) {
    console.log(cards.join(''), 'One pair', bid);
    return rankValues['One pair'];
  } else {
    console.log(cards.join(''), 'High card', bid);
    return rankValues['High card'];
  }
}

function compareCards(a: CardLabel[], b: CardLabel[]): number {
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    console.log('comparing', a, b);

    const valueA = cardValues[a[i]];
    const valueB = cardValues[b[i]];

    console.log('card value a', a[i], valueA);
    console.log('card value b', b[i], valueB);

    if (valueA !== valueB) {
      console.log('returning because of matching');
      return valueA - valueB;
    }
  }

  console.log('no match');
  return b.length - a.length; // If all labels are equal, shorter array wins
}

const hands = input.map((hand) => {
  const [rawCards, rawBid] = hand.split(' ');
  const cards = rawCards.split('') as CardLabel[];
  const bid = parseInt(rawBid);

  return { cards, bid, rank: assignHandValue({ cards, bid }) };
});

hands.sort((a, b) => {
  if (a.rank !== b.rank) {
    return a.rank - b.rank; // Sort by rank first
  } else {
    return compareCards(a.cards, b.cards);
  }
});

let sum = 0;

hands.forEach((hand, i) => {
  console.log(i + 1, hand.cards.join(''), hand.bid);
  sum += hand.bid * (i + 1);
});

console.log(sum);
