export default function TotalCoins() {
    const coins = Number(localStorage.getItem("videoPokerCoins"));
    return (
        <>
            <span>Totalt mynter: {coins}</span>
        </>
    )
}