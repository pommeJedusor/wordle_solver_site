import { Dispatch, SetStateAction } from "react";

export class WordleGame{
  colors: Array<Array<string>>;
  letters: Array<Array<string>>;
  current_row: number;
  setWordleGame: Dispatch<SetStateAction<WordleGame>>|undefined;

  constructor() {
    this.colors = [
      ["B", "B", "B", "B", "B"],
      ["B", "B", "B", "B", "B"],
      ["B", "B", "B", "B", "B"],
      ["B", "B", "B", "B", "B"],
      ["B", "B", "B", "B", "B"],
    ];
    this.letters = [
      ["R", "O", "A", "T", "E"],
      ["S", "L", "I", "M", "Y"],
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
    ];
    this.current_row = 0;
  }

  changeColor(row: number, col: number, color: string){
    console.log("test")
    this.colors[row][col] = color;
    this.setWordleGame([this])
  }
}
