import { useState, useEffect } from "preact/hooks";
import { State, Retries } from "../models/game";
import { generateTwoDigitQuestion } from "../models/questionGenerator";
import { Header, Stage, Footer } from "./components";

export const App = () => {
  const [operator, setOperator] = useState<"+" | "-">("+");
  const [gameState, setGameState] = useState<any>(null);

  const gameLogic = useState(() => {
    return new State(10, new Retries(), generateTwoDigitQuestion, setGameState);
  })[0];

  useEffect(() => {
    gameLogic.next();
  }, []);

  const handleNG = () => gameLogic.ng();
  const handleOK = () => gameLogic.ok();
  const handleReset = () => {
    gameLogic.reset();
    gameLogic.next();
  };
  const handleSwap = () => setOperator(operator === "+" ? "-" : "+");

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "x") handleNG();
    if (e.key === "c") handleOK();
    if (e.key === "r") handleReset();
    if (e.key === "-") handleSwap();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [operator]);

  if (!gameState || !gameState.current) {
    return <div>Loading...</div>;
  }

  return (
    <div class="game-container">
      <Header state={gameState} showCharacter={gameState.isDone} />
      <Stage question={gameState.current} operator={operator} />
      <Footer
        onNG={handleNG}
        onOK={handleOK}
        onReset={handleReset}
        onSwap={handleSwap}
      />
    </div>
  );
};
