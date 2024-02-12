import { atom } from "recoil";

interface LocationSearchResult {
  // result: any[];
  totalCount: number;
  maxPage: number;
}

// SEARCH TYPE
export const searchTypeState = atom({
  key: "searchType",
  default: true,
});
// SEARCH KEYWORD
export const searchKeywordState = atom({
  key: "keyword",
  default: "",
});
// LOCATION SEARCH RESULT
export const locationSearchResultState = atom<LocationSearchResult>({
  key: "searchResult",
  default: {
    // result: [],
    totalCount: 0,
    maxPage: 1,
  },
});
// SEARCH RESULT DATA
export const searchResultState = atom({
  key: "resultData",
  default: [],
});
