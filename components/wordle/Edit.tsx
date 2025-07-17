import { WordleGame } from "@/utils/Game"
import Image from "next/image";
import { useRef } from "react";

export function Edit({wordleGame}: {wordleGame: WordleGame}){
  const buttonRef = useRef<null>(null)

  function toggleEditMode(){
    buttonRef.current?.blur();
    if (wordleGame.isEditModeEnabled){
      wordleGame.endEdit();
    }else {
      wordleGame.isEditModeEnabled = true;
    }
    wordleGame.setWordleGame([wordleGame]);
  }

  return (
    <button ref={buttonRef} onClick={toggleEditMode} type="button" title="edit word" className="cursor-pointer place-self-center row-span-2 col-span-2 w-1/2 h-1/2 mx-2 p-1 rounded-full bg-slate-300 dark:bg-slate-400 hover:bg-slate-400 hover:dark:bg-slate-500 hover:ring-4 focus:ring-4 outline-none ring-slate-200 dark:ring-slate-300">
      <Image className="w-full h-full mx-auto" width={500} height={500} src="/edit.svg" alt="edit word"/>
    </button>
  )
}
