export class WordleGame{
  colors: Array<Array<string>>;
  letters: Array<Array<string>>;
  current_row: number;
  setWordleGame: (wordleGame: WordleGame[]) => void;
  lastChangeTimestamp: number;

  constructor() {
    this.colors = [
      ["Y", "B", "Y", "B", "Y"],
      ["B", "B", "B", "B", "B"],
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
    ];
    this.letters = [
      ["R", "O", "A", "T", "E"],
      ["B", "A", "L", "M", "S"],
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
    ];
    this.current_row = 1;
    this.setWordleGame = (_)=>{};
    this.lastChangeTimestamp = 0;
  }

  changeColor(row: number, col: number, color: string){
    this.colors[row][col] = color;
    this.setWordleGame([this]);
    const current_timestamp = Date.now();
    const body = this.getBody();
    (async () => {
      const rawResponse = await fetch(`http://127.0.0.1:5000/get_next_attempt?words=${body}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Cache-Control': 'max-age=3600',
        },
      });

      if (current_timestamp < this.lastChangeTimestamp)return;
      this.lastChangeTimestamp = current_timestamp 

      const word = await rawResponse.text();
      if (!word){
        this.letters[row + 1] = [" ", " ", " ", " ", " "];
        this.colors[row + 1] = [" ", " ", " ", " ", " "];
        this.setWordleGame([this]);
      }
      else{
        this.letters[row + 1] = word.split("");
        this.colors[row + 1] = ["B", "B", "B", "B", "B"];
        this.setWordleGame([this]);
      }
      for (let i = row + 2;i<this.letters.length;i++){
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
