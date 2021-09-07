import React from "react";

import logo from "../assets/logo.png";
import Board from "../components/Board";

import styles from "./App.module.scss";

function App() {
  return (
    <main>
      <nav className={styles.nav}>
        <img alt="Softvision" src={logo} width={120} />
      </nav>
      <Board />
    </main>
  );
}

export default App;
