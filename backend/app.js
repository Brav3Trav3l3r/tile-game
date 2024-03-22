const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(cors());
app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});

app.get("/safeKeys", (req, res) => {
  const safeKeys = getRandomScoreTiles();

  res.status(200).json({ total: safeKeys.length, safeKeys });
});

function getRandomScoreTiles() {
  const scoreTiles = [];
  const n = Math.floor(Math.random() * 4) + 9; // Random number between 9 and 11 inclusive

  for (let i = 0; i < n; i++) {
    const x = Math.floor(Math.random() * 8) + 2; // Random number between 2 and 9 inclusive
    const y = Math.floor(Math.random() * 10); // Random number between 0 and 9 inclusive
    scoreTiles.push({ x, y });
  }

  return scoreTiles;
}

module.exports = app;
