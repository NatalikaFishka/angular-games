import { Injectable } from '@angular/core';
import { DINO_CONFIG, GAME_SETTINGS } from '../config';
import { CardImageData, CardsCategory, GameSettings } from '../models';
import { multiply, sortConfig } from '../utils';

import { Observable, combineLatest } from 'rxjs'
import { tap, take } from 'rxjs/operators'
import { Store } from '@ngrx/store';
import { AppStore } from '../../app-store.model';
import { FISH_CONFIG } from '../config/fish.config';

@Injectable({
  providedIn: 'root'
})
export class CardConfigGeneratorService {

  private gameConfig!: CardImageData[];
  private matchesPerCard!: number;
  private cardsInPlay!: number;
  private cardsCategory!: CardsCategory;
  private cardsImageData!: Array<CardImageData>;

  private matchesPerCard$: Observable<number>;
  private cardsInPlay$: Observable<number>;
  private cardsCategory$: Observable<CardsCategory>;

  constructor(
    private store: Store<AppStore>
  ) {
    this.matchesPerCard$ = this.store.select(state => state.memoryGameResults.matchesPerCard);
    this.cardsInPlay$ = this.store.select(state => state.memoryGameResults.cardsInGame);
    this.cardsCategory$ = this.store.select(state => state.memoryGameResults.cardsCategory);
  }
  
  generateFinalConfig(): CardImageData[] {    
           
    combineLatest([this.cardsCategory$, this.matchesPerCard$, this.cardsInPlay$,]).subscribe(res => {
      this.cardsCategory = res[0];
      this.matchesPerCard = res[1];
      this.cardsInPlay = res[2];
    })

    switch (this.cardsCategory) {
      case CardsCategory.DINO : this.cardsImageData = DINO_CONFIG;
      break;
      case CardsCategory.FISH : this.cardsImageData = FISH_CONFIG;
      break;
      default : this.cardsImageData = DINO_CONFIG;
    }

    this.gameConfig = sortConfig([...this.cardsImageData]);
    this.gameConfig.splice(this.cardsInPlay);

    return sortConfig(multiply(this.gameConfig, this.matchesPerCard));
  }
}
