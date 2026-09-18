import type { PlayingCard } from "../types/playingcard";
import type { EvaluationResult } from "../types/pokerhand";

/**
 * Evaluerer en femkorts pokerhånd og returnerer rangering, visningsnavn og utbetalingsmultiplikator.
 *
 * @param hand Liste bestående av nøyaktig fem kort som skal evalueres.
 * @returns Resultatobjekt med rangering, visningsnavn og multiplikator for utbetaling.
 */
export function evaluatePokerHand(hand: PlayingCard[]): EvaluationResult {
  if (hand.length !== 5) {
    return { rank: "high_card", name: "High Card", multiplier: 0 };
  }

  const values = hand.map((c) => c.value).sort((a, b) => a - b);
  const suits = hand.map((c) => c.suit);

  const isFlush = suits.every((s) => s === suits[0]);

  const isStraightNormal = values.every((val, index) => {
    if (index === 0) return true;
    return val === values[index - 1] + 1;
  });

  const isWheelStraight =
    values[0] === 2 &&
    values[1] === 3 &&
    values[2] === 4 &&
    values[3] === 5 &&
    values[4] === 14;

  const isStraight = isStraightNormal || isWheelStraight;

  const counts: Record<number, number> = {};
  for (const v of values) {
    counts[v] = (counts[v] || 0) + 1;
  }
  const frequencies = Object.values(counts).sort((a, b) => b - a);

  if (isFlush && isStraight && values[0] === 10 && values[4] === 14) {
    return { rank: "royal_flush", name: "Royal Flush", multiplier: 250 };
  }

  if (isFlush && isStraight) {
    return { rank: "straight_flush", name: "Straight Flush", multiplier: 50 };
  }

  if (frequencies[0] === 4) {
    return { rank: "four_of_a_kind", name: "Four of a Kind", multiplier: 25 };
  }

  if (frequencies[0] === 3 && frequencies[1] === 2) {
    return { rank: "full_house", name: "Full House", multiplier: 9 };
  }

  if (isFlush) {
    return { rank: "flush", name: "Flush", multiplier: 6 };
  }

  if (isStraight) {
    return { rank: "straight", name: "Straight", multiplier: 4 };
  }

  if (frequencies[0] === 3) {
    return { rank: "three_of_a_kind", name: "Three of a Kind", multiplier: 3 };
  }

  if (frequencies[0] === 2 && frequencies[1] === 2) {
    return { rank: "two_pair", name: "Two Pair", multiplier: 2 };
  }

  const hasJacksOrBetterPair = Object.entries(counts).some(
    ([val, count]) => Number(val) >= 11 && count === 2,
  );

  if (hasJacksOrBetterPair) {
    return { rank: "jacks_or_better", name: "Jacks or Better", multiplier: 0 };
  }

  return { rank: "high_card", name: "High Card", multiplier: 0 };
}
