import { Dispatch, SetStateAction } from "react";

export class WordleGame{
  colors: Array<Array<string>>;
  letters: Array<Array<string>>;
  current_row: number;
  setWordleGame: (wordleGame: WordleGame[]) => void;

  constructor() {
    this.colors = [
      ["B", "B", "B", "B", "B"],
      ["B", "B", "B", "B", "B"],
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
    ];
    this.letters = [
      ["R", "O", "A", "T", "E"],
      ["S", "L", "I", "M", "Y"],
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
    ];
    this.current_row = 0;
    this.setWordleGame = (_)=>{};
  }

  changeColor(row: number, col: number, color: string){
    this.colors[row][col] = color;
    this.setWordleGame([this])
  }
}
