import Link from "next/link";

export default function NavBar(){
  return (
    <div className="flex flex-row justify-stretch h-10 w-full font-[700] text-lg text-black dark:text-white border">
      <Link className="w-full flex flex-col justify-center text-center border" href="/">Wordle Solver</Link>
      <Link className="w-full flex flex-col justify-center text-center border" href="/game">Wordle Simulator</Link>
    </div>
  )
}
