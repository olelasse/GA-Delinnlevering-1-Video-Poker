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
      <h2>Spill</h2>

      <TotalCoins />

      <div>
        <button
          type="button"
          onClick={() => setIsFaceUp((prev) => !prev)}
          style={{
            padding: "8px 16px",
            cursor: "pointer",
            marginBottom: "1rem",
          }}
        >
          Snu kort ({isFaceUp ? "Vis bakside" : "Vis forside"})
        </button>
      </div>

      <section aria-label="Spillerens hånd">
        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {INITIAL_HAND.map((card, index) => (
            <Card
              key={`${card.suit}-${card.value}-${index}`}
              card={card}
              faceUp={isFaceUp}
              isHeld={heldCards.includes(index)}
              onToggleHold={() => toggleHold(index)}
            />
          ))}
        </div>
      </section>

      <p>Holdte kort-indekser: {heldCards.join(", ") || "Ingen"}</p>

      <Game />
    </main>
  );
}
