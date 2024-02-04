import { atom } from "recoil";

interface DataType {
  id: number;
  title: string;
  member: string;
  content: string;
  location_lat: number;
  location_lon: number;
  created_at: string;
  updated_at: string;
  hashtag: string[];
  views: number;
  rating: number;
  likes: number;
  comments: number;
}

export const dummyDateState = atom<DataType[]>({
  key: "dummyData",
  default: [],
});

export const dummyModalState = atom<Boolean>({
  key: "modalState",
  default: false,
});
