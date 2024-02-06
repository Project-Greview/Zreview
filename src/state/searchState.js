import { atom } from "recoil";

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
export const locationSearchResultState = atom({
  key: "searchResult",
  default: {
    result: [],
    totalCount: 0,
    maxPage: 0,
  },
});
export const testData = atom({
  key: "datas",
  default: [],
});
