import "./App.css";
import TotalCoins from "./components/TotalCoins/TotalCoins.tsx";

export default function App() {
  return (
    <main>
      <h2>Spill</h2>

      <TotalCoins withdraw={20} />
    </main>
  );
}
