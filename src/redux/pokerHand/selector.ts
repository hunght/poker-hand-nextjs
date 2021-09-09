import { createSelector } from '@reduxjs/toolkit';
import { splitEvery } from 'ramda';

import { RootState } from '../rootReducer';
import { handDisplay } from './helper';

export const selectCardsForDeck = createSelector(
  (state: RootState) => state.pokerHand.cards,
  (state: RootState) => state.pokerHand.showPokerHand,
  (cardsData, showPokerHand) => {
    const hands = splitEvery(13, showPokerHand ? cardsData.slice(0, 5) : cardsData);
    return hands.map((hand) => handDisplay(hand));
  }
);
