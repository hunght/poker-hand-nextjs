// https://javascript.plainenglish.io/building-a-poker-hand-evaluator-without-conditional-branches-556c39c8e33e

// Card Matrix
// .  2  3  4  5  6  7  8  9  T  J  Q  K  A
// C 00 01 02 03 04 05 06 07 08 09 10 11 12
// D 13 14 15 16 17 18 19 20 21 22 23 24 25
// H 26 27 28 29 30 31 32 33 34 35 36 37 38
// S 39 40 41 42 43 44 45 46 47 48 49 50 51

import { DeckType, RankHand, Ranks } from './type';
const NUM_CARDS_IN_DECK = 52;
const NUM_VALUES_IN_DECK = 13;
const NUM_SUITS_IN_DECK = 4;
const NUM_CARDS_IN_HAND = 5;
const ACE_VALUE = Math.pow(2, 13);
const STRAIGHT_LOW_ACE_INDICATOR = parseInt('10000000011110', 2);
const TEN_CARD_POSITION = 8;
const RANK_BASE_VALUE = Math.pow(10, 9);
const CARD_VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

export const buildDeck = (): number[] => {
  const deck = Array.from(new Array(NUM_CARDS_IN_DECK), (_, index) => index);
  let count = NUM_CARDS_IN_DECK + 1;
  while ((count -= 1)) {
    deck.push(deck.splice(Math.floor(Math.random() * count), 1)[0]);
  }
  return deck;
};

export const rankHand = (hand: number[]): RankHand => {
  const suits = new Array(NUM_SUITS_IN_DECK).fill(0);
  const values = new Array(NUM_VALUES_IN_DECK).fill(0);
  hand.forEach((card) => {
    suits[Math.floor(card / NUM_VALUES_IN_DECK)] += 1;
    values[card % NUM_VALUES_IN_DECK] += 1;
  });
  let rankValue: number = values.reduce(
    (total, val, index) =>
      (total +=
        ((val === 1 && Math.pow(2, index + 1)) || 0) +
        ((val > 1 && Math.pow(2, index + 1) * ACE_VALUE * val) || 0)),
    0
  );
  const firstCardIndex = values.findIndex((index) => index === 1);

  const ranks: Ranks = {
    royal_flush: false,
    straight_flush: false,
    quads: values.some((count) => count === 4),
    full_house: values.filter(Boolean).length === 2,
    flush: suits.some((count) => count === NUM_CARDS_IN_HAND),
    straight:
      values
        .slice(firstCardIndex, firstCardIndex + NUM_CARDS_IN_HAND)
        .filter((count) => count === 1).length === 5 || rankValue === STRAIGHT_LOW_ACE_INDICATOR,
    trips: values.some((count) => count === 3),
    two_pairs: values.filter((count) => count === 2).length === 2,
    pair: values.filter((count) => count === 2).length === 1,
    high_card: true,
  };
  ranks.straight_flush = ranks.flush && ranks.straight;
  ranks.royal_flush = ranks.straight_flush && firstCardIndex === TEN_CARD_POSITION;
  let rankIndex = 0;
  let rankDescription = '';
  Object.keys(ranks).every((key, index) => {
    const rankKey = key as keyof Ranks;
    rankIndex = 10 - index;
    rankDescription = key;
    return !ranks[rankKey];
  });

  rankValue +=
    rankIndex * RANK_BASE_VALUE -
    ((rankValue === STRAIGHT_LOW_ACE_INDICATOR && ACE_VALUE - 1) || 0);
  rankDescription = rankDescription
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    rankValue,
    ranks,
    rankDescription,
    handDisplayString: handDisplayAsString(hand),
  };
};

export const handDisplay = (hand: number[]): DeckType[] => {
  const suits = ['clubs', 'diamonds', 'hearts', 'spades'];
  const deck: DeckType[] = hand.map((item) => ({
    value: CARD_VALUES[item % NUM_VALUES_IN_DECK],
    suit: suits[Math.floor(item / NUM_VALUES_IN_DECK)],
    image: `/images/playing-cards/${suits[Math.floor(item / NUM_VALUES_IN_DECK)]}_${
      CARD_VALUES[item % NUM_VALUES_IN_DECK]
    }.png`,
  }));
  return deck;
};

export const handDisplayAsString = (hand: number[]): string => {
  const suits = [`♣︎`, `♦︎`, `♥︎`, `♠︎`];
  return hand
    .map(
      (item) =>
        `${CARD_VALUES[item % NUM_VALUES_IN_DECK]}${suits[Math.floor(item / NUM_VALUES_IN_DECK)]}`
    )
    .join(' ');
};
