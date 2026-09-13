import "./App.css";
import Card from "./components/Card/Card.tsx";
import TotalCoins from "./components/TotalCoins/TotalCoins.tsx";

export default function App() {
  return (
    <main>
      <h2>Spill</h2>

      <TotalCoins />

      <Card card={{ suit: "hearts", value: 14 }} isHeld={true} />
      <Card faceUp={false} />
      <Card card={{ suit: "spades", value: 14 }} />
      <Card card={{ suit: "diamonds", value: 2 }} />
      <Card card={{ suit: "clubs", value: 10 }} />
    </main>
  );
}
