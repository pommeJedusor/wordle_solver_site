"use client"

import { Square } from "@/components/wordle/Square";
import { Arrow } from "./Arrow";
import { get_next_color, get_previous_color } from "@/utils/get_next_color";
import { WordleGame } from "@/utils/Game";
import { Edit } from "./Edit";
import { useEffect } from "react";

function create_squares(wordle_game: WordleGame[]){
  const wordleGame = wordle_game[0]
  const squares = [];
  for(let i=0;i<wordleGame.colors.length;i++){
    // up arrows
    if (i==wordleGame.current_row && !wordle_game[0].isGameModeEnabled){
      squares.push(<div className="row-span-1 col-span-2" key={1000 + i}></div>);
    }
    for(let j=0;i==wordleGame.current_row && j<wordleGame.colors[i].length && !wordle_game[0].isGameModeEnabled;j++){
      const previous_color = get_previous_color(wordleGame.colors[i][j]);
      squares.push(<Arrow wordleGame={wordleGame} row={i} col={j} color={previous_color} must_rotate={false} key={2000 + i * wordleGame.colors[0].length + j} />);
    }
    if (i==wordleGame.current_row && !wordle_game[0].isGameModeEnabled){
      squares.push(<div className="row-span-1 col-span-2" key={3000 + i}></div>);
    }

    // word
    if (!wordle_game[0].isGameModeEnabled)squares.push(<div className="row-span-2 col-span-2" key={4000 + i}></div>);
    for(let j=0;j<wordleGame.colors[i].length;j++){
      if (wordleGame.isEditModeEnabled && i == wordleGame.current_row){
        squares.push(<Square wordleGame={wordleGame} row={i} letter={wordleGame.EditModeWord[j]} color={wordleGame.EditModeWordColor[j]} key={i * wordleGame.colors[0].length + j}/>);
      }else{
        squares.push(<Square wordleGame={wordleGame} row={i} letter={wordleGame.letters[i][j]} color={wordleGame.colors[i][j]} key={i * wordleGame.colors[0].length + j}/>);
      }
    }
    // edit button
    if (i==wordleGame.current_row && !wordle_game[0].isGameModeEnabled){
      squares.push(<Edit wordleGame={wordleGame} key={5000 + i} />);
    }else if (!wordle_game[0].isGameModeEnabled){
      squares.push(<div className="row-span-2 col-span-2" key={6000 + i}></div>);
    }

    // down arrows
    if (i==wordleGame.current_row && !wordle_game[0].isGameModeEnabled){
      squares.push(<div className="row-span-1 col-span-2" key={7000 + i}></div>);
    }
    for(let j=0;i==wordleGame.current_row && j<wordleGame.colors[i].length && !wordle_game[0].isGameModeEnabled;j++){
      const next_color = get_next_color(wordleGame.colors[i][j]);
      squares.push(<Arrow wordleGame={wordleGame} row={i} col={j} color={next_color} must_rotate={true} key={8000 + i * wordleGame.colors[0].length + j} />);
    }
    if (i==wordleGame.current_row && !wordle_game[0].isGameModeEnabled){
      squares.push(<div className="row-span-1 col-span-2" key={9000 + i}></div>);
    }
  }
  return squares;
}

export function Grid({wordleGame}: {wordleGame: WordleGame[]}) {
  useEffect(() => {
    wordleGame[0].gameModeShake = () => {
      console.log("test2")
      wordleGame[0].gameModeShaking = true;
      wordleGame[0].setWordleGame([wordleGame[0]]);
      setTimeout(() => {
        wordleGame[0].gameModeShaking = false;
        wordleGame[0].setWordleGame([wordleGame[0]]);
      }, 500);
    };
  }, []);

  return (
    <div className="uppercase text-2xl sm:text-2xl md:text-3xl grid gameMode:grid-rows-12 grid-rows-14 gameMode:grid-cols-10 grid-cols-14 gap-2 h-90 sm:h-105 md:h-120 w-90 sm:w-105 md:w-120 gameMode:w-75 gameMode:sm:w-87 gameMode:md:w-99 dark:bg-background-night bg-background-day">
      {create_squares(wordleGame)}
    </div>
  );
}
