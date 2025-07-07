function GreenArrow() {
  return (
    <>
      <rect className="fill-well-placed-letter-day dark:bg-well-placed-letter-night" id="Rectangle 1" x="10.9638" width="3.05806" height="15.5052" rx="1.52903" transform="rotate(45 10.9638 0)"/>
      <rect className="fill-well-placed-letter-day dark:bg-well-placed-letter-night" id="Rectangle 2" x="21.9399" y="11.0637" width="3.05806" height="15.5052" rx="1.52903" transform="rotate(135 21.9399 11.0637)"/>
    </>
  );
}
function YellowArrow() {
  return (
    <>
      <rect className="fill-valid-letter-day dark:bg-valid-letter-night" id="Rectangle 1" x="10.9638" width="3.05806" height="15.5052" rx="1.52903" transform="rotate(45 10.9638 0)"/>
      <rect className="fill-valid-letter-day dark:bg-valid-letter-night" id="Rectangle 2" x="21.9399" y="11.0637" width="3.05806" height="15.5052" rx="1.52903" transform="rotate(135 21.9399 11.0637)"/>
    </>
  );
}
function BlackArrow() {
  return (
    <>
      <rect className="fill-unvalid-letter-day dark:bg-unvalid-letter-night" id="Rectangle 1" x="10.9638" width="3.05806" height="15.5052" rx="1.52903" transform="rotate(45 10.9638 0)"/>
      <rect className="fill-unvalid-letter-day dark:bg-unvalid-letter-night" id="Rectangle 2" x="21.9399" y="11.0637" width="3.05806" height="15.5052" rx="1.52903" transform="rotate(135 21.9399 11.0637)"/>
    </>
  );
}

export function Arrow({must_rotate, color}: {must_rotate: boolean, color: string}) {
  const rotation = must_rotate ? 180 : 0;

  let ArrowComponent = GreenArrow
  if (color == "Y"){
    ArrowComponent = YellowArrow
  }
  else if (color == "B"){
    ArrowComponent = BlackArrow
  }
  return (
    <svg className={"row-span-1 col-span-2 w-full h-full"} width="11" height="7" viewBox="0 0 22 14" transform={`rotate(${rotation} 0 0)`} xmlns="http://www.w3.org/2000/svg">
      <g id="arrow">
        <ArrowComponent />
      </g>
    </svg>
  );
}
