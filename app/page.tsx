import { Grid } from "@/components/wordle/Grid";

export default function Home() {
  const colors = [
    ["B", "B", "B", "Y", "B"],
    ["G", "B", "B", "B", "G"],
    ["B", "B", "Y", "B", "B"],
    ["B", "Y", "G", "B", "B"],
    //["G", "G", "G", "G", "G"],
    [" ", " ", " ", " ", " "],
  ]
  const letters = [
    ["R", "O", "A", "T", "E"],
    ["S", "H", "U", "N", "T"],
    ["A", "F", "L", "A", "P"],
    ["S", "T", "I", "L", "T"],
    [" ", " ", " ", " ", " "],
  ]

  return (
    <div className="dark:bg-background-night bg-background-day h-dvh">
      <Grid colors={colors} letters={letters}/>
    </div>
  );
}
