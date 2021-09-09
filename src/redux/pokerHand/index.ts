/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { range } from 'ramda';

import { buildDeck, rankHand } from './helper';

import { PokerHandState } from './type';

const initialState: PokerHandState = {
  showPokerHand: false,
  error: '',
  cards: range(0, 52),
  history: [],
};

const { reducer, actions } = createSlice({
  name: 'outputPage',
  initialState: initialState,
  reducers: {
    shuffleCards: (state) => {
      state.cards = buildDeck();
      state.showPokerHand = true;
      const rank = rankHand(state.cards.slice(0, 5));
      state.currentRankHand = rank;

      state.history.push(rank);

      state.history = state.history.sort((a, b) => {
        return b.rankValue - a.rankValue;
      });
    },
    resetCards: (state) => {
      state.showPokerHand = false;
      state.cards = initialState.cards;
      state.history = [];
      state.currentRankHand = undefined;
    },
  },
  extraReducers: () => {
    // postPackageReducer(builder);
  },
});

export { reducer, actions as pokerHandAction };
