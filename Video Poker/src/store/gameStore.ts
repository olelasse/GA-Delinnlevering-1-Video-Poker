import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Player } from "../types/player";
import type { PlayingCard } from "../types/playingcard";

interface GameState {
  players: Player[];
  activePlayerId: string | null;

  deck: PlayingCard[];
  hand: PlayingCard[];
  discardedCards: PlayingCard[];
  currentBet: number;

  createPlayer: (name: string) => void;
  setActivePlayer: (id: string) => void;
  updateCoins: (amount: number) => void;

  setCurrentBet: (bet: number) => void;
  setHand: (hand: PlayingCard[]) => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      players: [],
      activePlayerId: null,
      deck: [],
      hand: [],
      discardedCards: [],
      currentBet: 1,

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

      setHand: (hand: PlayingCard[]) => {
        set({ hand });
      },
    }),
    {
      name: "video-poker-storage",
    },
  ),
);
