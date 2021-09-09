// https://javascript.plainenglish.io/building-a-poker-hand-evaluator-without-conditional-branches-556c39c8e33e

import { DeckType, RankHand, Ranks } from './type';
const NUM_CARDS_IN_DECK = 52;
const NUM_VALUES_IN_DECK = 13;
const NUM_SUITS_IN_DECK = 4;
const NUM_CARDS_IN_HAND = 5;
const ACE_VALUE = Math.pow(2, 13);
const STRAIGHT_LOW_ACE_INDICATOR = parseInt('10000000011110', 2);
const TEN_CARD_POSITION = 8;
const RANK_BASE_VALUE = Math.pow(10, 9);

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
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const suits = ['spades', 'diamonds', 'clubs', 'hearts'];
  const deck: DeckType[] = hand.map((item) => ({
    value: values[item % NUM_VALUES_IN_DECK],
    suit: suits[Math.floor(item / NUM_VALUES_IN_DECK)],
    image: `/images/playing-cards/${suits[Math.floor(item / NUM_VALUES_IN_DECK)]}_${
      values[item % NUM_VALUES_IN_DECK]
    }.png`,
  }));
  return deck;
};

export const handDisplayAsString = (hand: number[]): string => {
  const values = '23456789TJQKA';
  const suits = [`♠︎`, `♦︎`, `♣︎`, `♥︎`];
  return hand
    .map(
      (item) =>
        `${values[item % NUM_VALUES_IN_DECK]}${suits[Math.floor(item / NUM_VALUES_IN_DECK)]}`
    )
    .join(' ');
};
