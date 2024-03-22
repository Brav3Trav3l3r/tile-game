import { RecoilRoot } from "recoil";
import styles from "./App.module.css";
import Board from "./components/Board";
import Controls from "./components/Controls";
import logo from "./assets/tileTrek_logo.png";
import { useCallback, useEffect, useState } from "react";

const fallbackScoreTiles = [
  { x: 2, y: 0 },
  { x: 3, y: 1 },
  { x: 4, y: 2 },
  { x: 5, y: 3 },
  { x: 6, y: 4 },
  { x: 7, y: 5 },
  { x: 8, y: 6 },
  { x: 9, y: 7 },
];

function App() {
  const [scoreTiles, setScoreTiles] = useState(null);

  const fetchScoreTiles = useCallback(async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/safeKeys`);

      if (!res.ok) {
        setScoreTiles(fallbackScoreTiles);
        throw new Error("Could not fetch tiles");
      }

      const resData = await res.json();
      setScoreTiles(resData.safeKeys);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    fetchScoreTiles();
  }, [fetchScoreTiles]);

  return (
    <RecoilRoot>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src={logo} alt="" />
        </div>
        <div className={styles.board}>
          <Board scoreTiles={scoreTiles} />
        </div>
        <div className={styles.controls}>
          <Controls fetchScoreTiles={fetchScoreTiles} />
        </div>
      </div>
    </RecoilRoot>
  );
}

export default App;
