import { atom } from "recoil";

interface ReviewDataType {
  id: number;
  place_name: string;
  place_address: string;
  content: string;
  location_lat: number;
  location_lon: number;
  created_at: string;
  updated_at: string;
  hashtag: string[];
  images: string[];
  views: number;
  rating: number;
  likes: number;
  comments: number;
  writer: string;
  profile: string;
}

export const dummyDateState = atom<ReviewDataType[]>({
  key: "dummyData",
  default: [],
});

export const dummyModalState = atom<Boolean>({
  key: "modalState",
  default: false,
});
