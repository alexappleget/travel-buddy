import { PlaceIconType } from "../../places";

export interface IPlace {
  id: number;
  name: string;
  interest: string;
  rating: number;
  x: number;
  y: number;
  img: string;
  icon: PlaceIconType;
}
