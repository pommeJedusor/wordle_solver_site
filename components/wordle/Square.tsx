function GreenSquare({letter}: {letter: string}){
  return (
    <>
      <div className={`grid row-span-2 col-span-2 w-full h-full bg-well-placed-letter-day dark:bg-well-placed-letter-night`}>
        <p className="text-4xl font-[1000] text-white place-self-center cursor-default">{letter}</p>
      </div>
    </>
  )
}

function YellowSquare({letter}: {letter: string}){
  return (
    <>
      <div className={`grid row-span-2 col-span-2 w-full h-full bg-valid-letter-day dark:bg-valid-letter-night`}>
        <p className="text-4xl font-[1000] text-white place-self-center cursor-default">{letter}</p>
      </div>
    </>
  )
}

function BlackSquare({letter}: {letter: string}){
  return (
    <>
      <div className={`grid row-span-2 col-span-2 w-full h-full bg-unvalid-letter-day dark:bg-unvalid-letter-night`}>
        <p className="text-4xl font-[1000] text-white place-self-center cursor-default">{letter}</p>
      </div>
    </>
  )
}

function EmptySquare({letter}: {letter: string}){
  return (
    <>
      <div className={`grid row-span-2 col-span-2 w-full h-full bg-background-day border-2 border-square-border-day dark:bg-background-night dark:border-square-border-night`}>
        <p className="text-4xl font-[1000] text-white place-self-center cursor-default">{letter}</p>
      </div>
    </>
  )
}


export function Square({color, letter}: {color: string, letter: string}){
  if (color == "G"){
    return<><GreenSquare letter={letter}/></>;
  }
  else if (color == "Y"){
    return<><YellowSquare letter={letter}/></>;
  }
  else if (color == "B") {
    return<><BlackSquare letter={letter}/></>;
  }
  else {
    return<><EmptySquare letter={letter}/></>;
  }
}
