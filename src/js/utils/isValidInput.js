export const isValidInput = (input) => {
  if(input.hasAttribute("required")) {
    if (input.value.length > 0)
      return true;
    return false;
  } else {
    return true;
  }
}