import { CardsCategory } from "./cards-category.enum";

export interface GameSettings {
    cardsCategory: CardsCategory
    cardsInGame: number;
    matchesPerCard: number;
}