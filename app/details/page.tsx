import NavBar from "@/components/wordle/NavBar";

export default function Home() {
  return (
    <div is-game="true" className="flex flex-col items-center gap-10 dark:bg-background-night bg-background-day min-h-dvh">
      <NavBar/>
    </div>
  );
}
