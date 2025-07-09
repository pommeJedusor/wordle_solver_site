"use client"
import { Grid } from "@/components/wordle/Grid";
import { WordleGame } from "@/utils/Game";
import { useState } from "react";

export default function Home() {
  const [wordleGame, setWordleGame] = useState([new WordleGame()])
  wordleGame[0].setWordleGame = setWordleGame

  return (
    <div className="grid place-content-center dark:bg-background-night bg-background-day h-dvh">
      <Grid wordleGame={wordleGame}/>
    </div>
  );
}
