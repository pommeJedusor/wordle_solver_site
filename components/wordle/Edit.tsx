import Image from "next/image";

export function Edit(){
  return (
    <button type="button" title="edit word" className="cursor-pointer mx-2 p-1 rounded-full bg-slate-300 dark:bg-slate-400 hover:bg-slate-400 hover:dark:bg-slate-500 hover:ring-4 focus:ring-4 outline-none ring-slate-200 dark:ring-slate-300">
      <Image className="w-12 h-12 mx-auto" width={500} height={500} src="/edit.svg" alt="edit word" />
    </button>
  )
}
