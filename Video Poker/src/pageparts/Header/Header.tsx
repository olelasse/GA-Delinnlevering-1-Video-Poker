import styles from "./Header.module.css";
import { NavLink } from "react-router";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>Video Poker</h1>
      <img
        src="/icons8-poker-color-96.png"
        width="50px"
        height="50px"
        alt="To kort, først et Ess i Spar, og bak et Ess i hjerte"
      />
      <nav>
        <NavLink to="/">Hjem</NavLink>
        <NavLink to="/rules">Regler</NavLink>
        <NavLink to="/players">Spillere</NavLink>
      </nav>
    </header>
  );
}
