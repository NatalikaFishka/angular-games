import { Injectable } from '@angular/core';
import { DINO_CONFIG, GAME_SETTINGS } from '../config';
import { Dino, GameSettings } from '../models';
import { multiply, sortConfig } from '../utils';

import { Observable, combineLatest } from 'rxjs'
import { tap, take } from 'rxjs/operators'
import { Store } from '@ngrx/store';
import { AppStore } from '../../app-store.model';

@Injectable({
  providedIn: 'root'
})
export class CardConfigGeneratorService {

  private gameConfig!: Dino[];
  private matchesPerCard!: number;
  private cardsInPlay!: number;

  private matchesPerCard$: Observable<number>;
  private cardsInPlay$: Observable<number>;

  constructor(
    private store: Store<AppStore>
  ) {
    this.matchesPerCard$ = this.store.select(state => state.memoryGameResults.matchesPerCard);
    this.cardsInPlay$ = this.store.select(state => state.memoryGameResults.cardsInGame);
  }
  
  generateFinalConfig(): Dino[] {    
           
    combineLatest([this.matchesPerCard$, this.cardsInPlay$]).subscribe(res => {
      this.matchesPerCard = res[0];
      this.cardsInPlay = res[1];
    })

    this.gameConfig = sortConfig([...DINO_CONFIG]);
    this.gameConfig.splice(this.cardsInPlay);

    return sortConfig(multiply(this.gameConfig, this.matchesPerCard));
  }
}
