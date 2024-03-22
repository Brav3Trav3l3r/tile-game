import { useEffect, useState } from "react";
import styles from "./styles/Tile.module.css";

export default function Tile({ type, x, y, onClick }) {
  const [shouldBlink, setShouldBlink] = useState(false);

  const handleClick = () => {
    onClick();
    setShouldBlink(true);
  };

  useEffect(() => {
    let timeout;

    if (shouldBlink) {
      // Set a timeout to reset the shouldBlink state after the animation duration (1s + a short delay)
      timeout = setTimeout(() => {
        setShouldBlink(false);
      }, 700);
    }

    // Clean up the timeout on component unmount or when shouldBlink changes
    return () => clearTimeout(timeout);
  }, [shouldBlink]);

  return (
    <div
      onClick={handleClick}
      style={{ top: `${y}px`, left: `${x}px` }}
      className={`${styles.tile} ${styles[type]} ${
        shouldBlink && styles.blinkThreeTimes
      }`}
    ></div>
  );
}
