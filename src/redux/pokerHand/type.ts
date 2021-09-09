export interface PokerHandState {
  showPokerHand: boolean;
  error: string;
  cards: number[];
  currentRankHand?: RankHand;
  history: RankHand[];
}

export type DeckType = {
  value: string;
  suit: string;
  image: string;
};
export type Ranks = {
  royal_flush: boolean;
  straight_flush: boolean;
  quads: boolean;
  full_house: boolean;
  flush: boolean;
  straight: boolean;
  trips: boolean;
  two_pairs: boolean;
  pair: boolean;
  high_card: boolean;
};

export type RankHand = {
  rankValue: number;
  ranks: Ranks;
  rankDescription: string;
  handDisplayString: string;
};
