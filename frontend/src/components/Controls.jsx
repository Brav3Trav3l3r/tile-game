import { useRecoilState, useResetRecoilState } from "recoil";
import { gameSpeedState, gameState } from "../store/atoms";
import styles from "./styles/Controls.module.css";

export default function Controls({ fetchScoreTiles }) {
  const [speed, setSpeed] = useRecoilState(gameSpeedState);
  const [game, setGame] = useRecoilState(gameState);
  const resetGame = useResetRecoilState(gameState);
  const resetSpeed = useResetRecoilState(gameSpeedState);

  const handleSpeed = (dir) => {
    if (dir == "fast" && speed == 50) {
      return;
    } else if (dir == "fast") {
      setSpeed((prev) => prev - 50);
    }

    if (dir == "slow" && speed == 250) {
      return;
    } else if (dir == "slow") {
      setSpeed((prev) => prev + 50);
    }
  };

  return (
    <div className={styles.controller}>
      <div className={styles.score}>
        <i>{game.score}</i>
      </div>

      <div className={styles.actions}>
        <div className={styles.rect}></div>
        <div className={styles.rect}></div>
        <div className={styles.rect}></div>
        <div className={`${styles.mainRect} ${styles.rect}`}>
          <button
            onClick={() => {
              fetchScoreTiles();
              resetGame();
              resetSpeed();
            }}
          >
            Reset
          </button>
          <button
            onClick={() =>
              setGame((prev) => ({ ...prev, paused: !prev.paused }))
            }
          >
            Play/Pause
          </button>
        </div>
        <div className={styles.rect}></div>
      </div>

      <div className={styles.controls}>
        <div className={styles.speed}>{speed}ms</div>
        <div className={styles.switches}>
          <div onClick={() => handleSpeed("fast")}></div>
          <div onClick={() => handleSpeed("slow")}></div>
        </div>
      </div>
    </div>
  );
}
