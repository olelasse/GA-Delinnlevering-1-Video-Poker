import { useState } from "react";
import { useGameStore } from "../../store/gameStore";
import Card from "../Card/Card";
import TotalCoins from "../TotalCoins/TotalCoins";
import styles from "./Game.module.css";

/**
 * Hovedkomponent for spillbrettet, som håndterer innsats, utdeling, hold av kort og trekk-fase.
 *
 * @returns Spillvisning for ruten / (eller spill-seksjonen).
 */
export default function Game() {
  const phase = useGameStore((state) => state.phase);
  const hand = useGameStore((state) => state.hand);
  const currentBet = useGameStore((state) => state.currentBet);
  const setCurrentBet = useGameStore((state) => state.setCurrentBet);
  const startRound = useGameStore((state) => state.startRound);
  const drawCards = useGameStore((state) => state.drawCards);
  const resetRound = useGameStore((state) => state.resetRound);
  const lastResult = useGameStore((state) => state.lastResult);
  const winAmount = useGameStore((state) => state.winAmount);

  const activePlayer = useGameStore((state) =>
    state.players.find((p) => p.id === state.activePlayerId),
  );

  const [heldCards, setHeldCards] = useState<number[]>([]);

  const toggleHold = (index: number) => {
    if (phase !== "holding") return;
    setHeldCards((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const handleAction = () => {
    if (phase === "betting") {
      setHeldCards([]);
      startRound();
    } else if (phase === "holding") {
      drawCards(heldCards);
    } else if (phase === "finished") {
      setHeldCards([]);
      resetRound();
    }
  };

  const canPlay = activePlayer && activePlayer.coins >= currentBet;

  return (
    <main className={styles.container}>
      <h2>Video Poker</h2>

      <div className={styles.topBar}>
        <TotalCoins />

        <div className={styles.betControl}>
          <label htmlFor="bet-select">Innsats:</label>
          <select
            id="bet-select"
            value={currentBet}
            disabled={phase !== "betting"}
            onChange={(e) => setCurrentBet(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((amount) => (
              <option key={amount} value={amount}>
                {amount}
              </option>
            ))}
          </select>
        </div>
      </div>

      {!activePlayer ? (
        <p className={styles.notice}>
          Du må velge en aktiv spiller under «Spillere» for å starte.
        </p>
      ) : (
        <>
          <section aria-label="Kort på hånden" className={styles.handSection}>
            <div className={styles.cardGrid}>
              {phase === "betting"
                ? Array.from({ length: 5 }).map((_, index) => (
                    <Card key={index} faceUp={false} />
                  ))
                : hand.map((card, index) => (
                    <Card
                      key={`${card.suit}-${card.value}-${index}`}
                      card={card}
                      faceUp={true}
                      isHeld={heldCards.includes(index)}
                      onToggleHold={
                        phase === "holding"
                          ? () => toggleHold(index)
                          : undefined
                      }
                    />
                  ))}
            </div>
          </section>

          {phase === "finished" && lastResult && (
            <div className={styles.resultBanner}>
              <h3>{lastResult.name}</h3>
              <p>
                {winAmount > 0
                  ? `Gratulerer! Du vant ${winAmount} mynter.`
                  : "Ingen gevinst denne runden."}
              </p>
            </div>
          )}

          <div className={styles.controls}>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={handleAction}
              disabled={phase === "betting" && !canPlay}
            >
              {phase === "betting" && "Del ut"}
              {phase === "holding" && "Trekk"}
              {phase === "finished" && "Ny runde"}
            </button>
          </div>
        </>
      )}
    </main>
  );
}
