import { useState } from "react";

export default function TotalCoins() {

    const [coins, setCoins] = useState(() => {
        const storage = localStorage.getItem("videoPokerCoins");
        return storage ? JSON.parse(storage) : (0);
    });
    
    return (
        <>
            <span>Totalt mynter: {coins}</span>
        </>
    )
}