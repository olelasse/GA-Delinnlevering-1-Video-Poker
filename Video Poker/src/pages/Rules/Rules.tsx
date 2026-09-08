import styles from "./Rules.module.css";

export default function Rules() {
  return (
    <main>
      <h2>Regler</h2>

      <ul className={styles.list}>
        <li>Spillets regler</li>
        <ul>
          <li>
            <b>Royal Flush:</b> A, K, Q, J, and 10 of the same suit.
          </li>
          <li>
            <b>Straight Flush:</b> Five consecutive cards of the same suit.
          </li>
          <li>
            <b>Four of a Kind:</b> Four cards of equal rank.
          </li>
          <li>
            <b>Full House:</b> Three of a kind plus a pair.
          </li>
          <li>
            <b>Flush:</b> Five cards of the same suit.
          </li>
          <li>
            <b>Straight:</b> Five consecutive cards in mixed suits.
          </li>
          <li>
            <b>Three of a Kind:</b> Three cards of equal rank.
          </li>
          <li>
            <b>Two Pair:</b> Two separate pairs.
          </li>
          <li>
            <b>One Pair:</b> Two cards of equal rank.
          </li>
          <li>
            High Card: Highest single card when no other combination is made.
          </li>
        </ul>
        <li>Oversikt over gevinster</li>
        <li>Utbetalinger</li>
        <li>Lenker til inspirasjon?</li>
        <li>Hvem som har laget appen?</li>
      </ul>
    </main>
  );
}
