import { combineReducers } from '@reduxjs/toolkit'

import { reducer as pokerHand } from './pokerHand'

const rootReducer = combineReducers({
  pokerHand,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
