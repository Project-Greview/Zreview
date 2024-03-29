import { atom } from "recoil";

interface MarkerDataType {
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

// MAP MARKER STATE
export const mapMarkerState = atom<MarkerDataType | null>({
  key: "markerData",
  default: null,
});
