export class WordleGame{
  colors: Array<Array<string>>;
  letters: Array<Array<string>>;
  current_row: number;
  setWordleGame: (wordleGame: WordleGame[]) => void;
  lastChangeTimestamp: number;
  isDailyWordleModeEnabled: Boolean;
  todaysWord: string|undefined;

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
    this.current_row = 0;
    this.setWordleGame = (_)=>{};
    this.lastChangeTimestamp = 0;
    this.isDailyWordleModeEnabled = false;
  }

  changeCurrentRow(row: number){
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
    for (let i=0;i<this.colors.length && this.colors[i][0] != " ";i++){
      const row_word = this.letters[i].join("");
      const row_color = this.colors[i].join("");
      const expected_colors = this.getColorsFromAttempt(solution, row_word);
      if (row_color == expected_colors)continue;
      this.colors[i] = expected_colors.split("");
      this.changeCurrentRow(i)
      break;
    }
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
}
function get_well_placed_letters(solution: string, attempt: string): Array<string | Boolean>{
  let result = [];
  for (let i=0;i<solution.length;i++){
    if (solution[i] == attempt[i])result.push(solution[i]);
    else result.push(false)
  }
    return result
}
