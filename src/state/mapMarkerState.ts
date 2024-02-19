import { atom } from "recoil";

interface MarkerDataType {
  id: number;
  place_name: string;
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

// MAP MARKER STATE
export const mapMarkerState = atom<MarkerDataType | null>({
  key: "markerData",
  default: null,
});
