import PayoutTable from "../../components/PayoutTable/PayoutTable";
import styles from "./Rules.module.css";

export default function Rules() {
  return (
    <main>
      <h2>Regler</h2>

      <p>Hender, og dets utbetalinger:</p>
      <PayoutTable />

      <p>Regler og fremgangsmåte</p>

      <ol className={styles.list}>
        <li>
          <b>Velg innsats:</b> Velg hvor mange mynter du vil satse i runden.
          Valget går fra 1 opp til 5.
        </li>
        <li>
          <b>Første utdeling:</b> Det blir utdelt 5 kort fra en standard
          52-korts kortstokk.
        </li>
        <li>
          <b>Behold eller kast:</b> Velg hvilke kort som skal beholdes (hold),
          og hvilke kort som skal kastes. Man kan beholde alt fra 0 til 5 kort.
        </li>
        <li>
          <b>Nye kort, og avgjørelse:</b> De forkastede kortene erstattes med
          nye kort fra samme kortstokk.
        </li>
        <li>
          <b>Gevinst:</b> Den endelige hånd blir sjekket opp mot
          gevinsttabellen. Det blir kun utbetalt for 2 par eller mer.
        </li>
      </ol>

      <ul className={styles.list}>
        <li>Spillets regler</li>
        <li>
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
        </li>
        <li>Oversikt over gevinster</li>
        <li>Utbetalinger</li>
        <li>Lenker til inspirasjon?</li>
        <li>Hvem som har laget appen?</li>
      </ul>
    </main>
  );
}
