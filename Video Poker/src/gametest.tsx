import { useState } from "react";
import { useGameStore } from "../../store/gameStore";
import Card from "../Card/Card";
import CurrentBet from "../CurrentBet/CurrentBet";
import HandDisplay from "../HandDisplay/HandDisplay";
import PayoutTable from "../PayoutTable/PayoutTable";
import styles from "./Game.module.css";

/**
 * Arkadeinspirert spillbrett for Video Poker med kabinett-layout og fysiske kontroller.
 *
 * @returns Komplett spillvisning utformet som en klassisk kasinoautomat.
 */
export default function Game() {
  const [showPayoutTable, setShowPayoutTable] = useState<boolean>(true);

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
    <div className={styles.cabinet}>
      <main className={styles.screen}>
        <div className={styles.screenHeader}>
          <CurrentBet />
          <button
            type="button"
            className={styles.toggleTableBtn}
            onClick={() => setShowPayoutTable((prev) => !prev)}
            aria-expanded={showPayoutTable}
          >
            {showPayoutTable ? "SKJUL TABELL" : "VIS TABELL"}
          </button>
        </div>

        <div
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
          <p className={styles.betDisplay}>VELG SPILLER UNDER SPILLERE</p>
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

            <div className={styles.statusLedBar}>
              <span className={styles.betDisplay}>BET {currentBet}</span>
              <span className={styles.creditsDisplay}>
                CREDITS {activePlayer.coins}
              </span>
            </div>
          </>
        )}
      </main>

      {activePlayer && (
        <div className={styles.physicalControls}>
          <button
            type="button"
            className={styles.arcadeButton}
            onClick={handleAction}
            disabled={phase === "betting" && !canPlay}
          >
            {phase === "betting" && "DEAL"}
            {phase === "holding" && "DRAW"}
            {phase === "finished" && "NEW ROUND"}
          </button>
        </div>
      )}
    </div>
  );
}
