import type { PlayingCard } from "../../types/playingcard";

type CardProps = {
  card: PlayingCard;
  faceUp?: boolean;
};

export default function Card(props: CardProps) {
  return (
    <>
      <p>Nothing here yet</p>
    </>
  );
}
