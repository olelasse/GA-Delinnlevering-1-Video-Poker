export default function TotalCoins(withdraw?: number) {
    const coins = Number(localStorage.getItem("videoPokerCoins"));

    console.log(`${typeof(coins)} - ${coins}`);
    console.log(`${typeof(withdraw)} - ${withdraw}`);

    withdraw && coins - withdraw; // Denne gjør ingenting
    withdraw && localStorage.setItem("videoPokerCoins", coins);

    console.log(withdraw)

    coins ?? 0; // Denne viser null, i stedetfor 0.
    return (
        <>
            <span>Totalt mynter: {coins}</span>
        </>
    )
}