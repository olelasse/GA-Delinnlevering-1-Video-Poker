import type {
  CardSuits,
  CardValue,
  PlayingCard,
} from "../../types/playingcard";
import styles from "./Card.module.css";

type CardProps = {
  card?: PlayingCard;
  faceUp?: boolean;
  isHeld?: boolean;
  onToggleHold?: () => void;
};

/**
 *
 * @param value Kortets tallverdi fra 2 til 14
 * @returns Visningsverdi som tekststreng (f.eks. 'J', 'Q', 'K', 'A' eller tall)
 */
function formatCardValue(value: CardValue): string {
  switch (value) {
    case 11:
      return "J";
    case 12:
      return "Q";
    case 13:
      return "K";
    case 14:
      return "A";
    default:
      return value.toString();
  }
}

/**
 *
 * @param suit Kortfargen (hearts, diamonds, clubs, spades)
 * @returns Tegn som representerer fargen
 */
function getSuitSymbol(suit: CardSuits): string {
  switch (suit) {
    case "hearts":
      return "♥";
    case "diamonds":
      return "♦";
    case "clubs":
      return "♣";
    case "spades":
      return "♠";
  }
}

/**
 *
 * @param props Egenskaper for kortet, visningsstatus og event-handler for klikk
 * @returns Et spillekort som et knappelement, eller en bakside som div
 */
export default function Card({
  card,
  faceUp = !!card,
  isHeld = false,
  onToggleHold,
}: CardProps) {
  if (!faceUp || !card) {
    return (
      <div
        className={`${styles.card} ${styles.back}`}
        aria-label="Skjult kort"
      />
    );
  }

  const isRed = card.suit === "hearts" || card.suit === "diamonds";
  const colorClass = isRed ? styles.red : styles.black;
  const displayValue = formatCardValue(card.value);
  const symbol = getSuitSymbol(card.suit);

  const accessibleLabel = `${displayValue} ${card.suit}${isHeld ? ", holdt" : ""}`;

  return (
    <button
      type="button"
      className={`${styles.card} ${colorClass} ${isHeld ? styles.held : ""}`}
      onClick={onToggleHold}
      disabled={!onToggleHold}
      aria-pressed={isHeld}
      aria-label={accessibleLabel}
    >
      <span className={styles.cornerTop} aria-hidden="true">
        <span>{displayValue}</span>
        <span>{symbol}</span>
      </span>

      <span className={styles.center} aria-hidden="true">
        {symbol}
      </span>

      <span className={styles.cornerBottom} aria-hidden="true">
        <span>{displayValue}</span>
        <span>{symbol}</span>
      </span>

      {isHeld && (
        <span className={styles.heldBadge} aria-hidden="true">
          HOLD
        </span>
      )}
    </button>
  );
}
