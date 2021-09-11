import { CardsCategory } from "./cards-category.enum";

export interface SaveResult {
    score: number;
    cardsCategory: CardsCategory;
    cardsInGame: number;
    matchesPerCard: number;
}