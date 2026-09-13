export type CardSuits = "hearts" | "diamonds" | "clubs" | "spades";

export type CardValue = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;

export type PlayingCard = {
  suit: CardSuits;
  value: CardValue;
};
