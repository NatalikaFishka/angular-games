import { ComponentRef, Injectable } from '@angular/core';
import { allMatch } from '../utils';
import { GAME_SETTINGS } from '../config'
import { GameSettings, GameState } from '../models';
import { BehaviorSubject, interval, Observable, Subscription } from 'rxjs';
import {map} from 'rxjs/operators';
import { CardComponent } from '../components/card/card.component';

@Injectable({
  providedIn: 'root'
})
export class GameResultService {

  private matchesPerCard: number = GAME_SETTINGS.matchesPerCard;
  private cardsInGame: number = GAME_SETTINGS.cardsInGame;
  private countMatchedCards: number = 0;
  private gameCardsComponents: ComponentRef<CardComponent>[] = [];
  private openedCardsComponent: CardComponent[] = [];
  private openedCards: string[] = [];
  
  private gameState: GameState = GameState.notStarted;
  public gameTimer$: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  private counter$: Observable<number> = interval(1000).pipe(map((v:number) => v+1));
  private counterSubscription!: Subscription;

  public openCard(cardComponent: CardComponent) {

    if(this.gameState === GameState.notStarted) {
      this.gameState = GameState.started;
      this.counterSubscription = this.counter$.subscribe((v) => {
        this.gameTimer$.next(v)
      })
    }

    this.openedCards.push(cardComponent.cardData.name);
    this.openedCardsComponent.push(cardComponent);
    
    if(this.openedCards.length === this.matchesPerCard) {
      setTimeout(() => this.checkForMatch(), 500);
    }
  }

  public setGameConfig(gameSettings: GameSettings) {
    this.matchesPerCard = gameSettings.matchesPerCard;
    this.cardsInGame = gameSettings.cardsInGame;
  }

  public addGameCardComponent(cardComponentRef: ComponentRef<CardComponent>) {
    this.gameCardsComponents.push(cardComponentRef);
  }

  public checkForMatch() {
    const areMached = allMatch(this.openedCards);

      for(let cardComponent of this.openedCardsComponent) { 
        if(areMached) {
          cardComponent.setMatched();
          this.isGameFinished();        
        } else {
          cardComponent.setDefault();
        }
      }     
       
      this.openedCards = [];
      this.openedCardsComponent = [];
  }

  public resetGame() {
    this.countMatchedCards = 0;
    this.openedCards = [];
    this.openedCardsComponent = [];
    this.gameCardsComponents = [];

    if( this.counterSubscription) {
      this.counterSubscription.unsubscribe();
    }
    this.gameState = GameState.notStarted;
    this.gameTimer$.next(0)
  }

  private isGameFinished() {

    this.countMatchedCards++; 

    if(this.countMatchedCards === this.cardsInGame * this.matchesPerCard) {

      this.gameState = GameState.finished;
      this.counterSubscription.unsubscribe();

      for(let cardComponent of this.gameCardsComponents) {
        setTimeout(() => {
          cardComponent.instance.isGameOver = true;
        }, 500);        
      }  
    }
  }
}
