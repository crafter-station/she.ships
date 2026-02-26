export type { CardData } from "@/lib/db/schema";

export interface CardBounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  frontZ: number;
  cornerRadius: number;
}
