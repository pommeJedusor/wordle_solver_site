"use client";
import './shaking-animation.css';
import { Grid } from "@/components/wordle/Grid";
import { KeyBoard } from "@/components/wordle/KeyBoard";
import { GameState, WordleGame } from "@/utils/Game";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";



export default function Home() {
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  function unfocusResetGameButton(){
    buttonRef.current?.blur();
  }

  useEffect(()=>{
    const func = (event: KeyboardEvent) => {
      if (!event.ctrlKey){
        wordleGame[0].keyPressEventListener(event.key);
      }
    };
    addEventListener("keydown", func);
    return () => removeEventListener("keydown", func);
  })
  const [wordleGame, setWordleGame] = useState([new WordleGame()]);
  wordleGame[0].setWordleGame = setWordleGame;
  wordleGame[0].enableGameMode();

  function resetGame(){
    setWordleGame([new WordleGame()]);
  }

  return (
      <div is-game="true" className="flex flex-col items-center gap-10 dark:bg-background-night bg-background-day min-h-dvh">
        <div className="flex flex-row justify-center mt-10">
          <button ref={buttonRef} onClick={()=>{resetGame();unfocusResetGameButton()}} type="button" title="refresh" className="cursor-pointer mx-2 focus:outline-none hover:outline-none focus:ring-4 hover:ring-4 focus:ring-sky-700 dark:focus:ring-sky-800 hover:ring-sky-600 dark:hover:ring-sky-700 bg-sky-500 dark:bg-sky-600 hover:bg-sky-400 dark:hover:bg-sky-500 p-1 rounded" >
            <Image className="md:w-12 sm:w-9 w-6 md:h-12 sm:h-9 h-6 mx-auto rotate-270" width={500} height={500} src="/refresh.svg" alt="refresh" />
          </button>
        </div>
        <Grid wordleGame={wordleGame}/>
        { wordleGame[0].gameModeState == GameState.Playing ? <KeyBoard wordleGame={wordleGame}/> : null}
        { wordleGame[0].gameModeState == GameState.Won ?
          <p className="text-green-600 text-xl font-[1000]">YOU WON</p>
          : null}
        { wordleGame[0].gameModeState == GameState.Lost ?
          <div>
            <p className="text-center text-red-600 text-xl font-[1000]">YOU LOST</p>
            <p className="text-center text-xl">the solution was <strong className="text-green-600 text-xl font-[1000]">{wordleGame[0].gameModeSolution}</strong></p>
          </div>
          : null}
    </div>
  );
}
