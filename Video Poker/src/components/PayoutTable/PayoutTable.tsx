import type { PayoutRule } from "../../types/pokerhand";

export const PAYOUT_RULES: PayoutRule[] = [
  { hand: "royal_flush", name: "Royal Flush", multiplier: 250 },
  { hand: "straight_flush", name: "Straight Flush", multiplier: 50 },
  { hand: "four_of_a_kind", name: "Fire like", multiplier: 25 },
  { hand: "full_house", name: "Hus", multiplier: 10 },
  { hand: "flush", name: "Flush", multiplier: 5 },
  { hand: "straight", name: "Straight", multiplier: 3 },
  { hand: "three_of_a_kind", name: "Tre like", multiplier: 2 },
  { hand: "two_pair", name: "To par", multiplier: 1 },
  {
    hand: "jacks_or_better",
    name: "Et par (knekt eller høyere)",
    multiplier: 0,
  },
  { hand: "high_card", name: "Høyt kort", multiplier: 0 },
];

export default function PayoutTable() {
  return (
    <table>
      <thead>
        <tr>
          <th>Type hånd</th>
          <th>Multiplikator</th>
        </tr>
      </thead>
      <tbody>
        {PAYOUT_RULES.map((rule) => (
          <tr key={rule.hand}>
            <td>{rule.name}</td>
            <td>{rule.multiplier}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
