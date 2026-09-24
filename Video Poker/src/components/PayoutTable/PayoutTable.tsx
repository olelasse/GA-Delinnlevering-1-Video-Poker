import { PAYOUT_RULES } from "../../data/rules";
import type { PokerHand } from "../../types/pokerhand";
import styles from "./PayoutTable.module.css";

type PayoutTableProps = {
  currentBet?: number;
  activeHand?: PokerHand | null;
};
/**
 *
 * @param props Valgfri hånd og innsats for visuell visning
 * @returns HTML-tabell over spillets utbetalingsstruktur
 */
export default function PayoutTable({
  currentBet = 1,
  activeHand = null,
}: PayoutTableProps) {
  const betLevels = [1, 2, 3, 4, 5];

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col" className={styles.handHeader}>
              Hånd
            </th>
            {betLevels.map((bet) => (
              <th
                key={bet}
                scope="col"
                className={currentBet === bet ? styles.activeColumn : undefined}
              >
                {bet} {bet === 1 ? "mynt" : "mynter"}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PAYOUT_RULES.map((rule) => {
            const isRowActive = activeHand === rule.hand;

            return (
              <tr
                key={rule.hand}
                className={isRowActive ? styles.activeRow : undefined}
              >
                <th scope="row" className={styles.handName}>
                  {rule.name}
                </th>
                {betLevels.map((bet) => (
                  <td
                    key={bet}
                    className={
                      currentBet === bet ? styles.activeColumn : undefined
                    }
                  >
                    {rule.multiplier * bet}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
