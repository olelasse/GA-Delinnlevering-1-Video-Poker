import type { PlayingCard } from "../types/playingcard";
import type { EvaluationResult, PokerHand } from "../types/pokerhand";
import { PAYOUT_RULES } from "../data/rules";

/**
 *
 * @param rank Vis resultat ut fra poker hånd
 * @returns En hjelpefunksjon, som bygges basert på reglene
 */
function createResult(rank: PokerHand): EvaluationResult {
  const rule = PAYOUT_RULES.find((r) => r.hand === rank);
  if (rule) {
    return {
      rank,
      multiplier: rule.multiplier,
    };
  }

  return {
    rank: "high_card",
    multiplier: 0,
  };
}

/**
 * Evaluerer en femkorts pokerhånd og returnerer rangering, visningsnavn og utbetalingsmultiplikator.
 *
 * @param hand Liste bestående av nøyaktig fem kort som skal evalueres.
 * @returns Resultatobjekt med rangering, visningsnavn og multiplikator for utbetaling.
 */
export function evaluatePokerHand(hand: PlayingCard[]): EvaluationResult {
  if (hand.length !== 5) {
    return createResult("high_card");
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
    return createResult("royal_flush");
  }

  if (isFlush && isStraight) {
    return createResult("straight_flush");
  }

  if (frequencies[0] === 4) {
    return createResult("four_of_a_kind");
  }

  if (frequencies[0] === 3 && frequencies[1] === 2) {
    return createResult("full_house");
  }

  if (isFlush) {
    return createResult("flush");
  }

  if (isStraight) {
    return createResult("straight");
  }

  if (frequencies[0] === 3) {
    return createResult("three_of_a_kind");
  }

  if (frequencies[0] === 2 && frequencies[1] === 2) {
    return createResult("two_pair");
  }

  if (frequencies[0] === 2) {
    const pairValue = Number(
      Object.keys(counts).find((k) => counts[Number(k)] === 2),
    );
    if (pairValue >= 11) {
      return createResult("jacks_or_better");
    }
  }

  return createResult("high_card");
}
