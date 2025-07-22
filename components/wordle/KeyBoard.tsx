"use client";

import { WordleGame } from "@/utils/Game";

enum Color {
  Default,
  NotInWord,
  WellPlaced,
  WronglyPlaced,
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
        {generateLetterKeys("zxcvbnm")}
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
