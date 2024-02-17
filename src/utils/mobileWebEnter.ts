import { KeyboardEvent } from "react";

export const handleInputKeyDown = (
  e: KeyboardEvent<HTMLInputElement>,
  searchType1: () => void,
  searchType2: () => void,
  resetResult: () => void,
  type: boolean
) => {
  console.log();
  if (e.key === "Enter") {
    if (type) {
      searchType1();
    } else {
      searchType2();
      resetResult();
    }
  }
};
