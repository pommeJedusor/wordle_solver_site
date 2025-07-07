import { Square } from "@/components/wordle/Square";
import { Arrow } from "./Arrow";
import { get_next_color, get_previous_color } from "@/utils/get_next_color";

function create_squares(colors: Array<Array<string>>, letters: Array<Array<string>>){
  let squares = [];
  for(let i=0;i<colors.length;i++){
    for(let j=0;i==3 && j<colors[i].length;j++){
      const letter_color = colors[i][j];
      squares.push(<Arrow color={get_next_color(letter_color)} must_rotate={false} key={1000 + i * colors[0].length + j} />);
    }
    for(let j=0;j<colors[i].length;j++){
      squares.push(<Square letter={letters[i][j]} color={colors[i][j]} key={i * colors[0].length + j}/>);
    }
    for(let j=0;i==3 && j<colors[i].length;j++){
      const letter_color = colors[i][j];
      squares.push(<Arrow color={get_previous_color(letter_color)} must_rotate={true} key={2000 + i * colors[0].length + j} />);
    }
  }
  return squares;
}

export function Grid({colors, letters}: {colors: Array<Array<string>>, letters: Array<Array<string>>}) {
  return (
    <div className="grid grid-rows-12 grid-cols-10 gap-2 h-120 w-100 dark:bg-background-night bg-background-day">
      {create_squares(colors, letters)}
    </div>
  );
}
