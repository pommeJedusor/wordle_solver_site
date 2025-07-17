"use client"

import { Square } from "@/components/wordle/Square";
import { Arrow } from "./Arrow";
import { get_next_color, get_previous_color } from "@/utils/get_next_color";
import { WordleGame } from "@/utils/Game";
import { Edit } from "./Edit";

function create_squares(wordle_game: WordleGame[]){
  const wordleGame = wordle_game[0]
  const squares = [];
  for(let i=0;i<wordleGame.colors.length;i++){
    // up arrows
    for(let j=0;i==wordleGame.current_row && j<wordleGame.colors[i].length;j++){
      const previous_color = get_previous_color(wordleGame.colors[i][j]);
      squares.push(<Arrow wordleGame={wordleGame} row={i} col={j} color={previous_color} must_rotate={false} key={1000 + i * wordleGame.colors[0].length + j} />);
    }
    if (i==wordleGame.current_row){
      squares.push(<div className="row-span-1 col-span-2" key={5000 + i}></div>);
    }

    // word
    for(let j=0;j<wordleGame.colors[i].length;j++){
      squares.push(<Square wordleGame={wordleGame} row={i} letter={wordleGame.letters[i][j]} color={wordleGame.colors[i][j]} key={i * wordleGame.colors[0].length + j}/>);
    }
    // edit button
    if (i==wordleGame.current_row){
      squares.push(<Edit key={3000 + i}/>);
    }else{
      squares.push(<div className="row-span-2 col-span-2" key={5000 + i}></div>);
    }

    // down arrows
    for(let j=0;i==wordleGame.current_row && j<wordleGame.colors[i].length;j++){
      const next_color = get_next_color(wordleGame.colors[i][j]);
      squares.push(<Arrow wordleGame={wordleGame} row={i} col={j} color={next_color} must_rotate={true} key={2000 + i * wordleGame.colors[0].length + j} />);
    }
    if (i==wordleGame.current_row){
      squares.push(<div className="row-span-1 col-span-2" key={4000 + i}></div>);
    }
  }
  return squares;
}

export function Grid({wordleGame}: {wordleGame: WordleGame[]}) {
  return (
    <div className="uppercase grid grid-rows-14 grid-cols-12 gap-2 h-180 w-150 dark:bg-background-night bg-background-day">
      {create_squares(wordleGame)}
    </div>
  );
}
