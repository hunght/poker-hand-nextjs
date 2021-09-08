import { createSelector } from '@reduxjs/toolkit'
import { splitEvery } from 'ramda'

import { RootState } from '../rootReducer'

export const selectCardsForDeck = createSelector(
  (state: RootState) => state.cards.cards,
  (cardsData) => {
    return splitEvery(13, cardsData)
  }
)
