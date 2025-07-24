"use client"

import { WordleGame } from "@/utils/Game"

function GreenSquare({letter, onClick}: {letter: string, onClick: ()=>void}){
  return (
    <>
      <div onClick={onClick} className={`grid row-span-2 col-span-2 w-full h-full bg-well-placed-letter-day dark:bg-well-placed-letter-night`}>
        <p className="select-none font-[1000] text-white place-self-center cursor-default">{letter}</p>
      </div>
    </>
  )
}

function YellowSquare({letter, onClick}: {letter: string, onClick: ()=>void}){
  return (
    <>
      <div onClick={onClick} className={`grid row-span-2 col-span-2 w-full h-full bg-valid-letter-day dark:bg-valid-letter-night`}>
        <p className="select-none font-[1000] text-white place-self-center cursor-default">{letter}</p>
      </div>
    </>
  )
}

function BlackSquare({letter, onClick}: {letter: string, onClick: ()=>void}){
  return (
    <>
      <div onClick={onClick} className={`grid row-span-2 col-span-2 w-full h-full bg-unvalid-letter-day dark:bg-unvalid-letter-night`}>
        <p className="select-none font-[1000] text-white place-self-center cursor-default">{letter}</p>
      </div>
    </>
  )
}

function EmptySquare({letter, onClick}: {letter: string, onClick: ()=>void}){
  return (
    <>
      <div onClick={onClick} className={`grid row-span-2 col-span-2 w-full h-full bg-background-day border-2 border-square-border-day dark:bg-background-night dark:border-square-border-night`}>
        <p className="font-[1000] text-white place-self-center cursor-default">{letter}</p>
      </div>
    </>
  )
}

function WhiteSquare({letter, onClick, wordleGame}: {letter: string, onClick: ()=>void, wordleGame: WordleGame}){
  return (
    <>
      <div onClick={onClick} className={`${wordleGame.gameModeShaking ? 'shake' : ''} grid row-span-2 col-span-2 w-full h-full bg-background-day border-2 border-black-700 dark:bg-background-night dark:border-gray-500 `}>
        <p className="font-[1000] text-black dark:text-white place-self-center cursor-default">{letter}</p>
      </div>
    </>
  )
}


export function Square({wordleGame, row, color, letter}: {wordleGame: WordleGame, row: number, color: string, letter: string}){
  function updateRow(){
    if (!["G", "Y", "B", "W"].includes(color))return;
    wordleGame.changeCurrentRow(row);
    wordleGame.setWordleGame([wordleGame]);
  }

  if (color == "G"){
    return(<><GreenSquare onClick={updateRow} letter={letter}/></>);
  }
  else if (color == "Y"){
    return<><YellowSquare onClick={updateRow} letter={letter}/></>;
  }
  else if (color == "B") {
    return<><BlackSquare onClick={updateRow} letter={letter}/></>;
  }
  else if (color == "W") {
    return<><WhiteSquare onClick={updateRow} letter={letter} wordleGame={wordleGame}/></>;
  }
  else {
    return<><EmptySquare onClick={updateRow} letter={letter}/></>;
  }
}
