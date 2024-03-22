import { RecoilRoot } from "recoil";
import styles from "./App.module.css";
import Board from "./components/Board";
import Controls from "./components/Controls";
import logo from "./assets/tileTrek_logo.png";

function App() {
  return (
    <RecoilRoot>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src={logo} alt="" />
        </div>
        <div className={styles.board}>
          <Board />
        </div>
        <div className={styles.controls}>
          <Controls />
        </div>
      </div>
    </RecoilRoot>
  );
}

export default App;
