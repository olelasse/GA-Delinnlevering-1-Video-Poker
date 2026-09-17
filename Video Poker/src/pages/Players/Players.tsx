import { useState } from "react";
import styles from "./Players.module.css";
import { useGameStore } from "../../store/gameStore";

/**
 * Administrasjon av spillere, registrering av nye profiler og valg av aktiv bruker
 * @returns Hovedvisning for spilleroversikt
 */
export default function Players() {
  const [playerName, setPlayerName] = useState("");
  const players = useGameStore((state) => state.players);
  const activePlayerId = useGameStore((state) => state.activePlayerId);
  const createPlayer = useGameStore((state) => state.createPlayer);
  const setActivePlayer = useGameStore((state) => state.setActivePlayer);

  return (
    <main className={styles.container}>
      <h2 className={styles.title}>Spillere</h2>

      <section className={styles.section} aria-labelledby="new-player-title">
        <h3 id="new-player-title" className={styles.sectionTitle}>
          Legg til ny spiller
        </h3>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (!playerName.trim()) return;

            createPlayer(playerName);
            setPlayerName("");
          }}
          className={styles.form}
        >
          <label htmlFor="player-name" className={styles.label}>
            Spillernavn:
          </label>
          <input
            id="player-name"
            className={styles.input}
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="F.eks. Vegar"
            required
          />
          <button type="submit" className={styles.submitBtn}>
            Opprett spiller
          </button>
        </form>
      </section>

      <section className={styles.section} aria-labelledby="player-list-title">
        <h3 id="player-list-title" className={styles.sectionTitle}>
          Registrerte spillere
        </h3>
        {players.length === 0 ? (
          <p className={styles.emptyText}>
            Ingen spillere registrert ennå. Opprett en spiller ovenfor for å
            starte
          </p>
        ) : (
          <ul className={styles.list}>
            {players.map((player) => {
              const isActive = player.id === activePlayerId;
              return (
                <li
                  key={player.id}
                  className={`${styles.playerCard} ${isActive ? styles.active : ""}`}
                >
                  <div className={styles.playerInfo}>
                    <strong className={styles.playerName}>{player.name}</strong>
                    <span className={styles.playerCoins}>
                      Mynter: {player.coins}
                    </span>
                  </div>

                  <button
                    type="button"
                    className={styles.selectBtn}
                    onClick={() => setActivePlayer(player.id)}
                    disabled={isActive}
                    aria-pressed={isActive}
                  >
                    {isActive ? "Valgt" : "Velg som aktiv"}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}
