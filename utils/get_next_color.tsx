export function get_next_color(color: string): string{
  if (color == "B"){
    return "G"
  }
  if (color == "G"){
    return "Y"
  }
  return "B"
}

export function get_previous_color(color: string): string{
  if (color == "B"){
    return "Y"
  }
  if (color == "G"){
    return "B"
  }
  return "G"
}
