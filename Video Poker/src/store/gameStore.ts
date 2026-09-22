import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Player } from "../types/player";
import type { PlayingCard } from "../types/playingcard";
import { createDeck, shuffleDeck } from "../utils/deck";
import { evaluatePokerHand } from "../utils/pokerHand";
import type { EvaluationResult } from "../types/pokerhand";

export type GamePhase = "betting" | "holding" | "finished";

export type GameState = {
  players: Player[];
  activePlayerId: string | null;
  phase: GamePhase;
  deck: PlayingCard[];
  hand: PlayingCard[];
  discardedCards: PlayingCard[];
  heldCards: number[];
  currentBet: number;
  lastResult: EvaluationResult | null;
  winAmount: number;

  createPlayer: (name: string) => void;
  setActivePlayer: (id: string) => void;
  updateCoins: (amount: number) => void;

  setCurrentBet: (bet: number) => void;
  toggleHoldCard: (index: number) => void;
  startRound: () => void;
  drawCards: () => void;
  resetRound: () => void;
};

/**
 * Global zustand const, for tilstandshåndtering med persist for lagring i localstorage
 *
 * @returns Mulighet til å manipulere spillets tilstand
 */
export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      players: [],
      activePlayerId: null,
      phase: "betting",
      deck: [],
      hand: [],
      discardedCards: [],
      heldCards: [],
      currentBet: 1,
      lastResult: null,
      winAmount: 0,

      createPlayer: (name: string) => {
        const trimmedName = name.trim();
        if (!trimmedName) return;

        const newPlayer: Player = {
          id: crypto.randomUUID(),
          name: trimmedName,
          coins: 100,
        };

        set((state) => ({
          players: [...state.players, newPlayer],
          activePlayerId: state.activePlayerId ?? newPlayer.id,
        }));
      },

      setActivePlayer: (id: string) => {
        set({ activePlayerId: id });
      },

      updateCoins: (amount: number) => {
        const { activePlayerId, players } = get();
        if (!activePlayerId) return;

        set({
          players: players.map((player) =>
            player.id === activePlayerId
              ? { ...player, coins: Math.max(0, player.coins + amount) }
              : player,
          ),
        });
      },

      setCurrentBet: (currentBet: number) => {
        set({ currentBet });
      },

      toggleHoldCard: (index: number) => {
        const { phase, heldCards } = get();
        if (phase !== "holding") return;

        set({
          heldCards: heldCards.includes(index)
            ? heldCards.filter((i) => i !== index)
            : [...heldCards, index],
        });
      },

      startRound: () => {
        const { activePlayerId, players, currentBet, updateCoins } = get();
        if (!activePlayerId) return;

        const activePlayer = players.find((p) => p.id === activePlayerId);
        if (!activePlayer || activePlayer.coins < currentBet) return;

        updateCoins(-currentBet);

        const freshDeck = shuffleDeck(createDeck());
        const initialHand = freshDeck.slice(0, 5);
        const remainingDeck = freshDeck.slice(5);

        set({
          phase: "holding",
          hand: initialHand,
          deck: remainingDeck,
          discardedCards: [],
          heldCards: [],
          lastResult: null,
          winAmount: 0,
        });
      },

      drawCards: () => {
        const {
          hand,
          deck,
          discardedCards,
          heldCards,
          currentBet,
          updateCoins,
        } = get();

        const newlyDiscarded: PlayingCard[] = [];
        let nextDeckIndex = 0;

        const finalHand = hand.map((card, index) => {
          if (heldCards.includes(index)) {
            return card;
          }
          newlyDiscarded.push(card);
          const replacement = deck[nextDeckIndex];
          nextDeckIndex++;
          return replacement;
        });

        const remainingDeck = deck.slice(nextDeckIndex);
        const result = evaluatePokerHand(finalHand);
        const won = currentBet * result.multiplier;

        if (won > 0) {
          updateCoins(won);
        }

        set({
          phase: "finished",
          hand: finalHand,
          deck: remainingDeck,
          discardedCards: [...discardedCards, ...newlyDiscarded],
          lastResult: result,
          winAmount: won,
        });
      },

      resetRound: () => {
        set({
          phase: "betting",
          hand: [],
          discardedCards: [],
          heldCards: [],
          lastResult: null,
          winAmount: 0,
        });
      },
    }),
    {
      name: "video-poker-storage",
    },
  ),
);
