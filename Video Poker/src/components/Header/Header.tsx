//import logo from "Video Poker/public/icons8-poker-ios-27-outlined-96.png";
import styles from "./Header.module.css";
import { NavLink } from "react-router";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>Video Poker</h1>
      <nav>
        <NavLink to="/">Hjem</NavLink>
        <NavLink to="/rules">Regler</NavLink>
        <NavLink to="/players">Spillere</NavLink>
      </nav>
    </header>
  );
}
