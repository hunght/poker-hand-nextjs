import { combineReducers } from '@reduxjs/toolkit'

import { reducer as cards } from './cards'

const rootReducer = combineReducers({
  cards,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
