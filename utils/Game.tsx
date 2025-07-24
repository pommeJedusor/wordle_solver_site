import { USABLE_WORDS } from "./usable_words";

export enum GameState {
  Playing,
  Won,
  Lost,
}

export class WordleGame{
  colors: Array<Array<string>>;
  letters: Array<Array<string>>;
  current_row: number = 0;
  setWordleGame: (wordleGame: WordleGame[]) => void =  (_)=>{};
  lastChangeTimestamp: number = 0;
  isEditModeEnabled: Boolean = false;
  EditModeWord: Array<string>;
  EditModeWordColor: Array<string>;
  isGameModeEnabled: Boolean;
  gameModeSolution: string|undefined;
  gameModeState: GameState|undefined;
  gameModeShake: ()=>void = ()=>{};
  gameModeShaking: Boolean = false;

  constructor() {
    this.colors = [
      ["B", "B", "B", "B", "B"],
      ["B", "B", "B", "B", "B"],
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
    ];
    this.letters = [
      ["s", "a", "l", "e", "t"],
      ["r", "o", "u", "n", "d"],
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
    ];
    this.EditModeWord = []
    this.EditModeWordColor = []
    this.isGameModeEnabled = false;
  }

  changeCurrentRow(row: number){
    this.endEdit();
    this.current_row = row;
    this.getNextGuess(row + 1);
  }

  changeColor(row: number, col: number, color: string){
    this.colors[row][col] = color;
    this.setWordleGame([this]);
    this.getNextGuess(row + 1);
  }

  getNextGuess(row: number){
    const current_timestamp = Date.now();
    const body = this.getBody();
    (async () => {
      const rawResponse = await fetch(`https://api-wordle-solver.chesspomme.com/get_next_attempt?words=${body}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Cache-Control': 'max-age=3600',
        },
      });

      if (current_timestamp < this.lastChangeTimestamp)return;
      this.lastChangeTimestamp = current_timestamp 

      let word = await rawResponse.text();
      let is_final_word = false;
      if (word[5] == "Y"){
        is_final_word = true;
        word = word.slice(0, 5);
      }

      if (!word){
        this.letters[row] = [" ", " ", " ", " ", " "];
        this.colors[row] = [" ", " ", " ", " ", " "];
        this.setWordleGame([this]);
      }
      else{
        this.letters[row] = word.split("");
        this.colors[row] = ["B", "B", "B", "B", "B"];
        this.setWordleGame([this]);
      }
      if (is_final_word){
        this.colors[row] = ["G", "G", "G", "G", "G"];
      }
      for (let i = row + 1;i<this.letters.length;i++){
        this.letters[i] = [" ", " ", " ", " ", " "];
        this.colors[i] = [" ", " ", " ", " ", " "];
      }
    })();
  }

  getBody(){
    let body = [];
    for (let i=0;i<=this.current_row;i++){
      const word = this.letters[i].join("");
      const colors = this.colors[i].join("");
      body.push(word.toLowerCase() + "|" + colors);
    }
    return body.join("||");
  }

  async colorSolution(): Promise<void>{
    const date = new Date().toLocaleString('sv').split(" ")[0]
    const solution = localStorage.getItem(`wordle-solver-${date}`)
    if (!solution){
      const interval_id = setInterval(()=>{
        if (localStorage.get(`wordle-solver-${date}`)){
          this.colorSolution();
          clearInterval(interval_id);
        }
      }, 100)
      return;
    }
    for (let i=0;i<=this.current_row;i++){
      const row_word = this.letters[i].join("");
      const expected_colors = this.getColorsFromAttempt(solution, row_word);
      this.colors[i] = expected_colors.split("");
    }
    this.setWordleGame([this]);
    this.getNextGuess(this.current_row + 1);
    return;
  }

  getColorsFromAttempt(solution: string, attempt: string): string{
    const well_placed_letters = get_well_placed_letters(solution, attempt)

    const letter_number = new Map();
    for (const letter of attempt){
      let nb_letter_occurences_in_attempt = attempt.split("").filter((a) => a == letter).length;
      let nb_letter_occurences_in_solution = solution.split("").filter((a) => a == letter).length;
      if (nb_letter_occurences_in_attempt <= nb_letter_occurences_in_solution){
        letter_number.set(letter, nb_letter_occurences_in_attempt);
      }
      else{
        letter_number.set(letter, nb_letter_occurences_in_solution);
      }
    }

    for (const letter of well_placed_letters.filter((a) => a)){
      letter_number.set(letter, letter_number.get(letter) - 1);
    }

    const colors = []
    for (let i=0;i<attempt.length;i++){
      const l = attempt[i];
      const well_placed_letter = well_placed_letters[i];
      if (well_placed_letter){
        colors.push("G")
      }
      else if (letter_number.get(l)){
        letter_number.set(l, letter_number.get(l) - 1);
        colors.push("Y")
      }
      else{
        colors.push("B")
      }
    }
    return colors.join("")
  }

  endEdit(){
    this.isEditModeEnabled = false;
    if (this.EditModeWord.length == 5){
      this.letters[this.current_row] = this.EditModeWord;
      this.colors[this.current_row] = ["B", "B", "B", "B", "B"];
      this.getNextGuess(this.current_row + 1);
    }
    this.EditModeWord = [];
    this.EditModeWordColor = [];
  }

  gameModekeyPressEventListener(key: string){
    if (this.current_row == this.letters.length)return;
    if (key == "Backspace"){
      let last_letter_index = -1;
      for (let i=0;i<this.letters[0].length;i++)if (this.letters[this.current_row][i] != " ")last_letter_index = i;
      if (last_letter_index != -1){
        this.letters[this.current_row][last_letter_index] = " ";
        this.colors[this.current_row][last_letter_index] = " ";
      }
      this.setWordleGame([this]);
    }
    else if (key == "Enter" && this.letters[this.current_row][this.letters[0].length - 1] != " "){
      const word = this.letters[this.current_row].join("");
      const is_word_usable = USABLE_WORDS.has(word)

      if (!is_word_usable){
        this.gameModeShake();
      }else {
        const colors = this.getColorsFromAttempt(this.gameModeSolution as string, word);
        this.colors[this.current_row] = colors.split("");
        this.current_row += 1;
        if (colors == "GGGGG"){
          this.current_row = this.letters.length
          this.gameModeState = GameState.Won;
        }
        this.setWordleGame([this]);
      }
    }
    else if (this.letters[this.current_row][this.letters[0].length - 1] == " " && /^[a-zA-Z]$/.test(key)){
      let last_letter_index = -1;
      for (let i=0;i<this.letters[0].length;i++)if (this.letters[this.current_row][i] != " ")last_letter_index = i;
      this.letters[this.current_row][last_letter_index + 1] = key.toLowerCase();
      this.colors[this.current_row][last_letter_index + 1] = "W";
      this.setWordleGame([this]);
    }
    if (this.current_row == this.letters.length && this.gameModeState == GameState.Playing){
      this.gameModeState = GameState.Lost;
    }
  }

  keyPressEventListener(key: string){
    if (this.isGameModeEnabled)return this.gameModekeyPressEventListener(key);
    if (key == "Backspace"){
      this.EditModeWordColor.pop();
      this.EditModeWord.pop();
    }
    else if (key == "Escape"){
      this.isEditModeEnabled = false;
      this.EditModeWord = [];
      this.EditModeWordColor = [];
    }
    else if (key == "Enter" && this.EditModeWord.length == 5){
      this.endEdit();
    }
    else if (this.EditModeWord.length < 5 && /^[a-zA-Z]$/.test(key)){
      this.EditModeWordColor.push("W");
      this.EditModeWord.push(key.toLowerCase());
    }
    this.setWordleGame([this]);
  }

  enableGameMode(){
    if (this.isGameModeEnabled)return;
    this.getRandomSolution();
    this.isGameModeEnabled = true;
    this.gameModeState = GameState.Playing;
    this.colors = [
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
    ];
    this.letters = [
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
    ];
  }

  async getRandomSolution(){
    const solution_id = Math.floor(Math.random() * 2309);
    const url = `https://api-wordle-solver.chesspomme.com/get_solution/${solution_id}`;
    const solution = await (await fetch(url)).text();
    this.gameModeSolution = solution
  }
}

function get_well_placed_letters(solution: string, attempt: string): Array<string | Boolean>{
  let result = [];
  for (let i=0;i<solution.length;i++){
    if (solution[i] == attempt[i])result.push(solution[i]);
    else result.push(false)
  }
    return result
}
