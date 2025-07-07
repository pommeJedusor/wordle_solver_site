"use client"
import { Grid } from "@/components/wordle/Grid";
import { WordleGame } from "@/utils/Game";
import { useState } from "react";

export default function Home() {
  const [wordleGame, setWordleGame] = useState([new WordleGame()])
  wordleGame[0].setWordleGame = setWordleGame

  const colors = [
    ["B", "B", "B", "Y", "B"],
    ["G", "B", "B", "B", "G"],
    ["B", "B", "Y", "B", "B"],
    ["B", "Y", "G", "B", "B"],
    //["G", "G", "G", "G", "G"],
    [" ", " ", " ", " ", " "],
  ]
  const letters = [
    ["R", "O", "A", "T", "E"],
    ["S", "H", "U", "N", "T"],
    ["A", "F", "L", "A", "P"],
    ["S", "T", "I", "L", "T"],
    [" ", " ", " ", " ", " "],
  ]

  return (
    <div className="dark:bg-background-night bg-background-day h-dvh">
      <Grid wordleGame={wordleGame}/>
    </div>
  );
}
