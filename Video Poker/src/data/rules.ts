import type { PokerHand } from "../types/pokerhand";

export type PayoutRule = {
  hand: PokerHand;
  name: string;
  multiplier: number;
};

export const PAYOUT_RULES: PayoutRule[] = [
  { hand: "royal_flush", name: "Royal Flush", multiplier: 250 },
  { hand: "straight_flush", name: "Straight Flush", multiplier: 50 },
  { hand: "four_of_a_kind", name: "Fire like", multiplier: 25 },
  { hand: "full_house", name: "Hus", multiplier: 10 },
  { hand: "flush", name: "Flush", multiplier: 6 },
  { hand: "straight", name: "Straight", multiplier: 4 },
  { hand: "three_of_a_kind", name: "Tre like", multiplier: 3 },
  { hand: "two_pair", name: "To par", multiplier: 2 },
  {
    hand: "jacks_or_better",
    name: "Et par (knekt eller høyere)",
    multiplier: 1,
  },
  { hand: "high_card", name: "Høyt kort", multiplier: 0 },
];
