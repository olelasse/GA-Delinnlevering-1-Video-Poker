import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Player } from "../types/player";
import type { PlayingCard } from "../types/playingcard";
import { createDeck, shuffleDeck } from "../utils/deck";
import { evaluatePokerHand, type EvaluationResult } from "../utils/pokerHand";

export type GamePhase = "betting" | "holding" | "finished";

export type GameState = {
  players: Player[];
  activePlayerId: string | null;
  phase: GamePhase;
  deck: PlayingCard[];
  hand: PlayingCard[];
  discardedCards: PlayingCard[];
  currentBet: number;
  lastResult: EvaluationResult | null;
  winAmount: number;
  createPlayer: (name: string) => void;
  setActivePlayer: (id: string) => void;
  updateCoins: (amount: number) => void;
  setCurrentBet: (bet: number) => void;
  startRound: () => void;
  drawCards: (heldIndices: number[]) => void;
  resetRound: () => void;
};

/**
 * Global tilstandshåndtering for Video Poker via Zustand med persist-middleware.
 *
 * @returns Hook for å hente og oppdatere spillstatus, spillere, saldo og runder.
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
          lastResult: null,
          winAmount: 0,
        });
      },

      drawCards: (heldIndices: number[]) => {
        const { hand, deck, discardedCards, currentBet, updateCoins } = get();

        const newlyDiscarded: PlayingCard[] = [];
        let nextDeckIndex = 0;

        const finalHand = hand.map((card, index) => {
          if (heldIndices.includes(index)) {
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
