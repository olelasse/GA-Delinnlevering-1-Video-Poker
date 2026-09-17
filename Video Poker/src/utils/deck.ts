import type { CardSuits, CardValue, PlayingCard } from "../types/playingcard";

const SUITS: CardSuits[] = ["hearts", "diamonds", "clubs", "spades"];

const VALUES: CardValue[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

/**
 * Oppretter en komplett kortstokk bestående av 52 unike kort.
 *
 * @returns En array med 52 PlayingCard-objekter.
 */
export function createDeck(): PlayingCard[] {
  const deck: PlayingCard[] = [];

  for (const suit of SUITS) {
    for (const value of VALUES) {
      deck.push({ suit, value });
    }
  }

  return deck;
}

/**
 * Blander en kortstokk tilfeldig ved hjelp av Fisher-Yates shuffle-algoritmen.
 *
 * @param deck Kortstokken som skal stokkes.
 * @returns En ny array med kortene i tilfeldig rekkefølge.
 */
export function shuffleDeck(deck: PlayingCard[]): PlayingCard[] {
  const shuffled = [...deck];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

if (import.meta.env.DEV) {
  const fresh = createDeck();
  const shuffled = shuffleDeck(fresh);

  console.log("Kortstokk generert (52 kort):", fresh.length);
  console.table(fresh.slice(0, 5));

  console.log("Kortstokk stokket (første 5 kort):");
  console.table(shuffled.slice(0, 5));
}
