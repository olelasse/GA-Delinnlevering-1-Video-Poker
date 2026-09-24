import { useGameStore } from "../../store/gameStore";
import styles from "./CurrentBet.module.css";

/**
 * Komponent for visning og endring av spillerens aktive innsats.
 *
 * @returns Element med innsatsvelger som kontrolleres mot spillets betting-fase.
 */
export default function CurrentBet() {
  const currentBet = useGameStore((state) => state.currentBet);
  const setCurrentBet = useGameStore((state) => state.setCurrentBet);
  const phase = useGameStore((state) => state.phase);

  return (
    <div className={styles.container}>
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
  );
}
