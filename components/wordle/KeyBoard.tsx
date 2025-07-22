"use client";

import { WordleGame } from "@/utils/Game";

enum Color {
  Default,
  NotInWord,
  WellPlaced,
  WronglyPlaced,
}

function DeleteKey({wordleGame}: {wordleGame: WordleGame}){
  function onClick(){
    wordleGame.keyPressEventListener("Backspace");
  }
  return (
    <div onClick={onClick} className="grid h-full basis-3/23 bg-square-border-day dark:bg-square-border-night text-black dark:text-white rounded-md cursor-pointer">
      <svg className="place-self-center h-1/2 w-1/2 fill-black dark:fill-white" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"/><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/><g id="SVGRepo_iconCarrier"> <path d="M216,43.99963H68.5293a12.05811,12.05811,0,0,0-10.28907,5.82715L12.57031,125.942a3.99551,3.99551,0,0,0,0,4.11523l45.669,76.11621a12.05879,12.05879,0,0,0,10.29,5.82617H216a12.01312,12.01312,0,0,0,12-12v-144A12.01312,12.01312,0,0,0,216,43.99963Zm4,156a4.004,4.004,0,0,1-4,4H68.5293a4.017,4.017,0,0,1-3.42871-1.9414h-.001L20.665,127.99963,65.10059,53.942a4.017,4.017,0,0,1,3.42871-1.94239H216a4.004,4.004,0,0,1,4,4Zm-57.17188-93.17187-21.17187,21.17187,21.17187,21.17188a3.99957,3.99957,0,1,1-5.65625,5.65625L136,133.65588l-21.17188,21.17188a3.99957,3.99957,0,0,1-5.65625-5.65625l21.17188-21.17188-21.17188-21.17187a3.99957,3.99957,0,0,1,5.65625-5.65625L136,122.34338l21.17187-21.17187a3.99957,3.99957,0,0,1,5.65625,5.65625Z"/> </g></svg>
    </div>
  )
}

function EnterKey({wordleGame}: {wordleGame: WordleGame}){
  function onClick(){
    wordleGame.keyPressEventListener("Enter");
  }
  return (
    <div onClick={onClick} className="grid h-full basis-3/23 bg-square-border-day dark:bg-square-border-night text-black dark:text-white rounded-md cursor-pointer">
      <p className="select-none text-sm font-[1000] place-self-center">enter</p>
    </div>
  )
}

function DefaultLetterKey({letter, wordleGame}: {letter: string, wordleGame: WordleGame}){
  function onClick(){
    wordleGame.keyPressEventListener(letter);
  }
  return (
    <div onClick={onClick} className="grid h-full basis-2/23 bg-square-border-day dark:bg-square-border-night text-black dark:text-white rounded-md cursor-pointer">
      <p className="select-none font-[1000] place-self-center">{letter}</p>
    </div>
  )
}

function WellPlacedLetterKey({letter, wordleGame}: {letter: string, wordleGame: WordleGame}){
  function onClick(){
    wordleGame.keyPressEventListener(letter);
  }
  return (
    <div onClick={onClick} className="grid h-full basis-2/23 bg-well-placed-letter-day dark:bg-well-placed-letter-night text-white rounded-md cursor-pointer">
      <p className="select-none font-[1000] place-self-center">{letter}</p>
    </div>
  )
}

function WronglyPlacedLetterKey({letter, wordleGame}: {letter: string, wordleGame: WordleGame}){
  function onClick(){
    wordleGame.keyPressEventListener(letter);
  }
  return (
    <div onClick={onClick} className="grid h-full basis-2/23 bg-valid-letter-day dark:bg-valid-letter-night text-white rounded-md cursor-pointer">
      <p className="select-none font-[1000] place-self-center">{letter}</p>
    </div>
  )
}

function NotInWordLetterKey({letter, wordleGame}: {letter: string, wordleGame: WordleGame}){
  function onClick(){
    wordleGame.keyPressEventListener(letter);
  }
  return (
    <div onClick={onClick} className="grid h-full basis-2/23 bg-unvalid-letter-day dark:bg-unvalid-letter-night text-white rounded-md cursor-pointer">
      <p className="select-none font-[1000] place-self-center">{letter}</p>
    </div>
  )
}

export function KeyBoard({wordleGame}: {wordleGame: WordleGame[]}){
  function generateLetterKeys(letters: string){
    const result = [];
    for (const letter of letters){
      const letter_color = getColorOfLetter(letter, wordleGame[0]);
      if (letter_color == Color.WellPlaced)result.push(<WellPlacedLetterKey letter={letter} wordleGame={wordleGame[0]} key={letter}/>);
      else if (letter_color == Color.WronglyPlaced)result.push(<WronglyPlacedLetterKey letter={letter} wordleGame={wordleGame[0]} key={letter}/>);
      else if (letter_color == Color.NotInWord)result.push(<NotInWordLetterKey letter={letter} wordleGame={wordleGame[0]} key={letter}/>);
      else result.push(<DefaultLetterKey letter={letter} wordleGame={wordleGame[0]} key={letter}/>);
    }
    return result;
  }

  return (
    <div className="text-1xl sm:text-1xl md:text-2xl grid grid-flow-col grid-rows-3 gap-2 uppercase w-90 sm:w-122 md:w-140 h-60 sm:h-50 md:h-60">
      <div className="flex justify-center gap-2">
        {generateLetterKeys("qwertyuiop")}
      </div>
      <div className="flex justify-center gap-2">
        {generateLetterKeys("asdfghjkl")}
      </div>
      <div className="flex justify-center gap-2">
        <EnterKey wordleGame={wordleGame[0]}/>
        {generateLetterKeys("zxcvbnm")}
        <DeleteKey wordleGame={wordleGame[0]}/>
      </div>
    </div>
  )
}

function getColorOfLetter(letter: string, wordleGame: WordleGame): Color{
  let color = Color.Default;
  for (let i=0;i<wordleGame.letters.length;i++){
    for (let j=0;j<wordleGame.letters[0].length;j++){
      if (wordleGame.letters[i][j] != letter)continue;
      if (wordleGame.colors[i][j] == "G")return Color.WellPlaced;
      else if (wordleGame.colors[i][j] == "Y")color = Color.WronglyPlaced;
      else if (wordleGame.colors[i][j] == "B" && color != Color.WronglyPlaced)color = Color.NotInWord;
    }
  }
  return color;
}
