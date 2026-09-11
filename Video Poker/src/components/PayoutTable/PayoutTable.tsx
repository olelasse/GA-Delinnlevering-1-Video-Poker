
export type PokerHand = 
  | "royal_flush"
  | "straight_flush"
  | "four_of_a_kind"
  | "full_house"
  | "flush"
  | "straight"
  | "three_of_a_kind"
  | "two_pair"
  | "jacks_or_better"
  | "high_card";
  
export type PayoutRule = {
  hand: PokerHand;
  name: string;
  multiplier: number;
}

export default function PayoutTable() {
  return (
    <>
      <p>Nothing here yet</p>
    </>
  );
}
