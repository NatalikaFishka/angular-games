import { Injectable } from '@angular/core';
import { DINO_CONFIG, GAME_SETTINGS } from '../config';
import { Dino, GameSettings } from '../models';
import { multiply, sortConfig } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class CardConfigGeneratorService {

  private gameConfig!: Dino[];
  private matchesPerCard: number = GAME_SETTINGS.matchesPerCard;
  private cardsInPlay: number = GAME_SETTINGS.cardsInGame;

  constructor() {
   
  }

  setGameConfig(gameSettings: GameSettings) {
    this.matchesPerCard = gameSettings.matchesPerCard;
    this.cardsInPlay = gameSettings.cardsInGame;

    this.generateFinalConfig();
  }

  getMatchesPerCard(): number {
    return this.matchesPerCard;
  }

  generateFinalConfig(): Dino[] {

    this.gameConfig = sortConfig([...DINO_CONFIG]);
    this.gameConfig.splice(this.cardsInPlay);
    // return multiply(this.gameConfig, this.matchesPerCard);
    return sortConfig(multiply(this.gameConfig, this.matchesPerCard));
  }
}
