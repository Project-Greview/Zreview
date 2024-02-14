import { atom } from "recoil";

interface ReviewStoreSearchResult {
  totalCount: number;
  maxPage: number;
}
interface ReviewLocationInfo {
  placeName: string;
  placeLatitude: number;
  placeLongitude: number;
  placeAddress: string;
}

// REVIEW SCORE
export const starScoreState = atom({
  key: "score",
  default: 3,
});

// REVIEW STORE SEARCH RESULT
export const reviewStoreSearchResultState = atom<ReviewStoreSearchResult>({
  key: "result",
  default: {
    totalCount: 0,
    maxPage: 0,
  },
});

// REVIEW STORE SEARCH DATA
export const reviewSearchResultState = atom({
  key: "storeData",
  default: [],
});

// REVIEW LOCATION INFO DATA
export const reviewLocationInfoState = atom<ReviewLocationInfo>({
  key: "locationInfo",
  default: {
    placeName: "",
    placeLatitude: 0,
    placeLongitude: 0,
    placeAddress: "",
  },
});
