import Link from "next/link";

export default function NavBar(){
  return (
    <div className="flex flex-row justify-stretch h-10 w-full font-[700] text-lg text-black dark:text-white border">
      <Link className="w-full flex flex-row items-center justify-center text-center border" href="/"><strong className="hidden sm:block">Wordle&nbsp;</strong>Solver</Link>
      <Link className="w-full flex flex-row items-center justify-center text-center border" href="/game"><strong className="hidden sm:block">Wordle&nbsp;</strong>Simulator</Link>
      <Link className="w-full flex flex-row items-center justify-center text-center border" href="/details">Details</Link>
    </div>
  )
}
