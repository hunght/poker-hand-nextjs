import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { cardsData } from '../../data'

import { PokerHandState } from './type'

const initialState: PokerHandState = {
  loading: false,
  error: '',
  cards: cardsData,
}

const { reducer, actions } = createSlice({
  name: 'outputPage',
  initialState: initialState,
  reducers: {
    setSelectedRoute: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
  extraReducers: () => {
    // postPackageReducer(builder);
  },
})

export { reducer, actions as outputPageAction }
