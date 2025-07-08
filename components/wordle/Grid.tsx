"use client"

import { Square } from "@/components/wordle/Square";
import { Arrow } from "./Arrow";
import { get_next_color, get_previous_color } from "@/utils/get_next_color";
import { WordleGame } from "@/utils/Game";

function create_squares(wordle_game: WordleGame[]){
  const wordleGame = wordle_game[0]
  let squares = [];
  for(let i=0;i<wordleGame.colors.length;i++){
    for(let j=0;i==wordleGame.current_row && j<wordleGame.colors[i].length;j++){
      const previous_color = get_previous_color(wordleGame.colors[i][j]);
      squares.push(<Arrow wordleGame={wordleGame} row={i} col={j} color={previous_color} must_rotate={false} key={1000 + i * wordleGame.colors[0].length + j} />);
    }
    for(let j=0;j<wordleGame.colors[i].length;j++){
      squares.push(<Square wordleGame={wordleGame} row={i} letter={wordleGame.letters[i][j]} color={wordleGame.colors[i][j]} key={i * wordleGame.colors[0].length + j}/>);
    }
    for(let j=0;i==wordleGame.current_row && j<wordleGame.colors[i].length;j++){
      const next_color = get_next_color(wordleGame.colors[i][j]);
      squares.push(<Arrow wordleGame={wordleGame} row={i} col={j} color={next_color} must_rotate={true} key={2000 + i * wordleGame.colors[0].length + j} />);
    }
  }
  return squares;
}

export function Grid({wordleGame}: {wordleGame: WordleGame[]}) {
  return (
    <div className="grid grid-rows-12 grid-cols-10 gap-2 h-120 w-100 dark:bg-background-night bg-background-day">
      {create_squares(wordleGame)}
    </div>
  );
}
