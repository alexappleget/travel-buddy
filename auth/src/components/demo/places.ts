export type PlaceIconType = "gaming" | "cafe" | "store" | "district" | "museum" | "default";

export interface Place {
  id: number;
  name: string;
  interest: string;
  rating: number;
  x: number;
  y: number;
  img: string;
  icon: PlaceIconType;
}

export const places: Place[] = [
  {
    id: 1,
    name: "Pokemon Center Mega Tokyo",
    interest: "Pokemon",
    rating: 4.8,
    x: 62,
    y: 32,
    img: "🎮",
    icon: "store",
  },
  {
    id: 2,
    name: "Pokemon Cafe",
    interest: "Pokemon",
    rating: 4.7,
    x: 48,
    y: 48,
    img: "☕",
    icon: "cafe",
  },
  {
    id: 3,
    name: "Nintendo Tokyo",
    interest: "Nintendo",
    rating: 4.9,
    x: 18,
    y: 62,
    img: "🕹️",
    icon: "gaming",
  },
  {
    id: 4,
    name: "Akihabara District",
    interest: "Anime",
    rating: 4.6,
    x: 60,
    y: 58,
    img: "🏙️",
    icon: "district",
  },
  {
    id: 5,
    name: "Ghibli Museum",
    interest: "Anime",
    rating: 4.9,
    x: 12,
    y: 38,
    img: "🎬",
    icon: "museum",
  },
  {
    id: 6,
    name: "Nintendo World Store",
    interest: "Nintendo",
    rating: 4.7,
    x: 35,
    y: 68,
    img: "⭐",
    icon: "store",
  },
];
