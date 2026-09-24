import { useState } from "react";
import { useGameStore } from "../../store/gameStore";
import Card from "../Card/Card";
import TotalCoins from "../TotalCoins/TotalCoins";
import CurrentBet from "../CurrentBet/CurrentBet";
import HandDisplay from "../HandDisplay/HandDisplay";
import PayoutTable from "../PayoutTable/PayoutTable";
import styles from "./Game.module.css";

/**
 * Hovedkomponent for spillbrettet, som håndterer innsats, utdeling, hold av kort og trekk-fase.
 *
 * @returns Spillgrensesnittet for Video Poker.
 */
export default function Game() {
  const [showPayoutTable, setShowPayoutTable] = useState<boolean>(false);

  const phase = useGameStore((state) => state.phase);
  const hand = useGameStore((state) => state.hand);
  const heldCards = useGameStore((state) => state.heldCards);
  const currentBet = useGameStore((state) => state.currentBet);
  const startRound = useGameStore((state) => state.startRound);
  const drawCards = useGameStore((state) => state.drawCards);
  const resetRound = useGameStore((state) => state.resetRound);
  const toggleHoldCard = useGameStore((state) => state.toggleHoldCard);
  const lastResult = useGameStore((state) => state.lastResult);
  const winAmount = useGameStore((state) => state.winAmount);

  const activePlayer = useGameStore((state) =>
    state.players.find((p) => p.id === state.activePlayerId),
  );

  const handleAction = () => {
    if (phase === "betting") {
      startRound();
    } else if (phase === "holding") {
      drawCards();
    } else if (phase === "finished") {
      resetRound();
    }
  };

  const canPlay = activePlayer && activePlayer.coins >= currentBet;

  return (
    <main className={styles.container}>
      <h2 className={styles.gameHeading}>Video Poker</h2>

      <div className={styles.topBar}>
        <TotalCoins />
        <div className={styles.topBarActions}>
          <CurrentBet />
          <button
            type="button"
            className={styles.toggleTableBtn}
            onClick={() => setShowPayoutTable((prev) => !prev)}
            aria-expanded={showPayoutTable}
            aria-controls="payout-table-collapse"
          >
            {showPayoutTable ? "Skjul premier" : "Se premier"}
          </button>
        </div>
      </div>

      <div
        id="payout-table-collapse"
        className={`${styles.tableDrawer} ${showPayoutTable ? styles.tableDrawerOpen : ""}`}
      >
        <div className={styles.drawerInner}>
          <PayoutTable
            currentBet={currentBet}
            activeHand={
              phase === "finished" && lastResult ? lastResult.rank : null
            }
          />
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
                          ? () => toggleHoldCard(index)
                          : undefined
                      }
                    />
                  ))}
            </div>
          </section>

          {phase === "finished" && lastResult && (
            <HandDisplay rank={lastResult.rank} winAmount={winAmount} />
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
