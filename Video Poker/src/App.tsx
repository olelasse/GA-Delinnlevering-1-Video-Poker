import { useState } from "react";
import "./App.css";
import Card from "./components/Card/Card.tsx";
import TotalCoins from "./components/TotalCoins/TotalCoins.tsx";
import type { PlayingCard } from "./types/playingcard.ts";

import "./utils/deck.ts"; // Test av stokking!
import Game from "./components/Game/Game.tsx";

const INITIAL_HAND: PlayingCard[] = [
  { suit: "hearts", value: 14 },
  { suit: "spades", value: 13 },
  { suit: "diamonds", value: 10 },
  { suit: "clubs", value: 7 },
  { suit: "hearts", value: 2 },
];

export default function App() {
  const [heldCards, setHeldCards] = useState<number[]>([]);
  const [isFaceUp, setIsFaceUp] = useState<boolean>(true);

  const toggleHold = (index: number) => {
    setHeldCards((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <main
      style={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
      }}
    >
      <Game />
    </main>
  );
}
