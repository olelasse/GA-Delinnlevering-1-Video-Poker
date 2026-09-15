import { useGameStore } from "../../store/gameStore";

export default function TotalCoins() {
  const activePlayer = useGameStore((state) =>
    state.players.find((p) => p.id === state.activePlayerId),
  );

  const coins = activePlayer ? activePlayer.coins : 0;

  return (
    <>
      <span>Totalt mynter: {coins}</span>
    </>
  );
}
