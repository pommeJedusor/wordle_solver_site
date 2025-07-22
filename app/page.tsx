"use client"
import { Grid } from "@/components/wordle/Grid";
import { KeyBoard } from "@/components/wordle/KeyBoard";
import { WordleGame } from "@/utils/Game";
import Image from "next/image";
import { useEffect, useState } from "react";

async function getTodaysWord(){
  const date = new Date().toLocaleString('sv').split(" ")[0];
  const url = `https://api-wordle-solver.chesspomme.com/get_todays_word/${date}`;
  const stored_solution = localStorage.getItem(`wordle-solver-${date}`);
  if (stored_solution)return;
  const solution = await (await fetch(url)).text();
  localStorage.setItem(`wordle-solver-${date}`, solution);
}

export default function Home() {
  useEffect(()=>{
    getTodaysWord();

    const func = (event: KeyboardEvent) => {if (wordleGame[0].isEditModeEnabled)wordleGame[0].keyPressEventListener(event)};
    addEventListener("keydown", func);
    return () => removeEventListener("keydown", func);
  })
  const [wordleGame, setWordleGame] = useState([new WordleGame()])
  wordleGame[0].setWordleGame = setWordleGame

  function resetGame(){
    setWordleGame([new WordleGame()]);
  }
  function toggleDailyWordleMode(){
    wordleGame[0].colorSolution()
  }

  return (
      <div className="flex flex-col items-center gap-10 dark:bg-background-night bg-background-day min-h-dvh">
        <div className="flex flex-row justify-center mt-10">
          <button onClick={toggleDailyWordleMode} type="button" title="change color according to today's word on wordle" className="cursor-pointer mx-2 focus:outline-none hover:outline-none focus:ring-4 hover:ring-4 focus:ring-yellow-700 dark:focus:ring-yellow-800 hover:ring-yellow-600 dark:hover:ring-yellow-700 bg-yellow-500 dark:bg-yellow-600 hover:bg-yellow-400 dark:hover:bg-yellow-500 p-1 rounded" >
            <Image className="md:w-12 sm:w-9 w-6 md:h-12 sm:h-9 h-6 mx-auto" width={500} height={500} src="/star.svg" alt="toggle cheat" />
          </button>
          <button onClick={resetGame} type="button" title="refresh" className="cursor-pointer mx-2 focus:outline-none hover:outline-none focus:ring-4 hover:ring-4 focus:ring-sky-700 dark:focus:ring-sky-800 hover:ring-sky-600 dark:hover:ring-sky-700 bg-sky-500 dark:bg-sky-600 hover:bg-sky-400 dark:hover:bg-sky-500 p-1 rounded" >
            <Image className="md:w-12 sm:w-9 w-6 md:h-12 sm:h-9 h-6 mx-auto rotate-270" width={500} height={500} src="/refresh.svg" alt="refresh" />
          </button>
        </div>
        <Grid wordleGame={wordleGame}/>
        <KeyBoard wordleGame={wordleGame}/>
    </div>
  );
}
