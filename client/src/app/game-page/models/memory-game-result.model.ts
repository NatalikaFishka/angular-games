import { CardsCategory } from "./cards-category.enum";

export interface MemoryGameResult {
    id: string;
    score: number;
    cardsCategory: CardsCategory;
    cardsInGame:number;
    matchesPerCard: number;
    data: Date;
}