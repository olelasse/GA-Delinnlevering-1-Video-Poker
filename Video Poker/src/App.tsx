import "./App.css";
import Game from "./components/Game/Game.tsx";

export default function App() {
  return (
    <main
      style={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
      }}
    >
      <Game />
    </main>
  );
}
