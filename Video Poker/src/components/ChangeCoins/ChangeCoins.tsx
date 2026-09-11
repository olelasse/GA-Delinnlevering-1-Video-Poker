import { useEffect, useState } from "react";

type CoinType = {
    withdraw: boolean;
    amount: number;
}

export default function ChangeCoins() {

    const [coins, setCoins] = useState(() => {
        const storage = localStorage.getItem("videoPokerCoins");
        return storage ? JSON.parse(storage) : (0);
    });

    useEffect(() => {
        localStorage.setItem("videoPokerCoins", JSON.stringify(coins))
    }, [coins]);

    return (<></>)
}