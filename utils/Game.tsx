export class WordleGame{
  colors: Array<Array<string>>;
  letters: Array<Array<string>>;
  current_row: number;
  setWordleGame: (wordleGame: WordleGame[]) => void;
  lastChangeTimestamp: number;

  constructor() {
    this.colors = [
      ["B", "B", "B", "B", "B"],
      ["B", "B", "B", "B", "B"],
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
    ];
    this.letters = [
      ["r", "o", "a", "t", "e"],
      ["s", "l", "i", "m", "y"],
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
    ];
    this.current_row = 0;
    this.setWordleGame = (_)=>{};
    this.lastChangeTimestamp = 0;
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
}
