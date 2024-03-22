import { useRecoilState, useRecoilValue } from "recoil";
import useInterval from "../hooks/useInterval";
import { dangerTilesState, gameSpeedState, gameState } from "../store/atoms";
import Tile from "./Tile";
import styles from "./styles/Board.module.css";

const safeTiles = (() => {
  const safe = [];
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 10; j++) {
      safe.push({ x: i, y: j });
    }
  }

  return safe;
})();

export default function Board() {
  const [dangerTiles, setDangerTiles] = useRecoilState(dangerTilesState);
  const speed = useRecoilValue(gameSpeedState);
  const [game, setGame] = useRecoilState(gameState);

  const handleTileUpdate = () => {
    const copyTiles = [...dangerTiles.tiles];
    const firstTile = copyTiles[0];

    // if x >= 2 && dir == left, move left
    if (firstTile.x > 2 && dangerTiles.dir == "left") {
      moveTiles(copyTiles, "left");
    }

    // if x == 2 and dir == left, change dir and move right
    if (firstTile.x == 2) {
      changeDirAndMove(copyTiles, "right");
    }

    // if x <= 8 and dir == right, move right
    if (firstTile.x < 8 && dangerTiles.dir == "right") {
      moveTiles(copyTiles, "right");
    }

    // if x == 8 and dir == right, change dir and move left
    if (firstTile.x == 8) {
      changeDirAndMove(copyTiles, "left");
    }
  };

  const changeDirAndMove = (tiles, dir) => {
    const newTiles = tiles.map((tile) => {
      if (dir == "right") {
        return { ...tile, x: tile.x + 1 };
      } else {
        return { ...tile, x: tile.x - 1 };
      }
    });

    setDangerTiles({ tiles: newTiles, dir });
  };

  const moveTiles = (tiles, dir) => {
    const newTiles = tiles.map((tile) => {
      if (dir == "right") {
        return { ...tile, x: tile.x + 1 };
      } else {
        return { ...tile, x: tile.x - 1 };
      }
    });

    setDangerTiles({ ...dangerTiles, tiles: newTiles });
  };

  useInterval(handleTileUpdate, speed, game.paused);

  const scoreTiles = [
    { x: 2, y: 0 },
    { x: 3, y: 1 },
    { x: 4, y: 2 },
    { x: 5, y: 3 },
    { x: 6, y: 4 },
    { x: 7, y: 5 },
    { x: 8, y: 6 },
    { x: 9, y: 7 },
  ];

  const handleScore = (action) => {
    if (action == "add") {
      setGame((prev) => ({ ...prev, score: prev.score + 10 }));
    } else if (action == "subtract") {
      setGame((prev) => ({ ...prev, score: prev.score - 10 }));
    } else {
      return;
    }
  };

  return (
    <div className={styles.board}>
      <div className="safe">
        {safeTiles?.map((tile, index) => {
          const xOffset = tile.x * 40;
          const yOffset = tile.y * 40;

          return (
            <Tile
              onClick={handleScore}
              type={"safe"}
              key={index}
              x={xOffset}
              y={yOffset}
            />
          );
        })}
      </div>
      <div className="score"></div>
      <div className="score">
        {scoreTiles.map((tile, index) => {
          const xOffset = tile.x * 40;
          const yOffset = tile.y * 40;

          return (
            <Tile
              onClick={() => handleScore("add")}
              type={"score"}
              key={index}
              x={xOffset}
              y={yOffset}
            />
          );
        })}
      </div>
      <div className="danger">
        {dangerTiles.tiles.map((tile, index) => {
          const xOffset = tile.x * 40;
          const yOffset = tile.y * 40;

          return (
            <Tile
              onClick={() => handleScore("subtract")}
              type={"danger"}
              key={index}
              x={xOffset}
              y={yOffset}
            />
          );
        })}
      </div>
    </div>
  );
}
