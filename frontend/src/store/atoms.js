import { atom } from "recoil";

const dangerTiles = () => {
  const safe = [];
  for (let i = 8; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      safe.push({ x: i, y: j });
    }
  }

  return safe;
};

export const dangerTilesState = atom({
  key: "DangerTiles",
  default: { tiles: dangerTiles(), dir: "left" },
});

export const gameSpeedState = atom({
  key: "gameSpeed",
  default: 250,
});

export const gameState = atom({
  key: "gameState",
  default: {
    paused: false,
    score: 0,
  },
});
