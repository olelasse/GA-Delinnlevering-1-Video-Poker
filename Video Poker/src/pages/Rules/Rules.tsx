import PayoutTable from "../../components/PayoutTable/PayoutTable";
import styles from "./Rules.module.css";

export default function Rules() {
  return (
    <main className={styles.mainContainer}>
      <h2>Regler</h2>

      <p>Hender, og dets utbetalinger:</p>
      <PayoutTable />

      <h3>Regler og fremgangsmåte</h3>

      <section className={styles.rulesSection}>
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
            og hvilke kort som skal kastes. Man kan beholde alt fra 0 til 5
            kort.
          </li>
          <li>
            <b>Nye kort, og avgjørelse:</b> De forkastede kortene erstattes med
            nye kort fra samme kortstokk.
          </li>
          <li>
            <b>Gevinst:</b> Den endelige hånd blir sjekket opp mot
            gevinsttabellen. Det blir kun utbetalt for et par (knekt eller
            høyere) eller mer.
          </li>
        </ol>
      </section>
    </main>
  );
}
