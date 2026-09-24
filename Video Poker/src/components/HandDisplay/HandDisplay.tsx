import type { PokerHand } from "../../types/pokerhand";
import { PAYOUT_RULES } from "../../data/rules";
import styles from "./HandDisplay.module.css";

type HandDisplayProps = {
  rank: PokerHand | null;
  winAmount?: number;
};

/**
 * Viser gjeldende pokerhånd og eventuell utbetaling basert på typen PokerHand.
 *
 * @param props Egenskaper som inneholder gjeldende PokerHand-rangering og gevinstsum.
 * @returns Rendret banner for oppnådd pokerhånd.
 */
export default function HandDisplay({ rank, winAmount = 0 }: HandDisplayProps) {
  if (!rank) return null;

  const rule = PAYOUT_RULES.find((r) => r.hand === rank);
  const displayName = rule ? rule.name : "High Card";

  return (
    <section aria-live="polite" className={styles.banner}>
      <h3 className={styles.handTitle}>{displayName}</h3>
      <p className={styles.winText}>
        {winAmount > 0
          ? `Gratulerer! Du vant ${winAmount} mynter.`
          : "Ingen gevinst denne runden."}
      </p>
    </section>
  );
}
