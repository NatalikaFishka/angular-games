import { ComponentRef, Injectable } from '@angular/core';
import { allMatch } from '../utils';
import { GAME_SETTINGS } from '../config'
import { GameSettings, GameState, MemoryGameResult, SaveResult } from '../models';
import { BehaviorSubject, interval, Observable, Subscription, combineLatest } from 'rxjs';
import {filter, map, switchMap, take, takeLast, takeUntil, tap} from 'rxjs/operators';
import { CardComponent } from '../components/card/card.component';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import {getGameResults, saveGameResult, updateGameResult, updateGameResultFailure} from '../store/actions/game-result.actions'
import { AppStore } from 'src/app/app-store.model';

@Injectable({
  providedIn: 'root'
})
export class GameResultService {

  private matchesPerCard!: number;
  private cardsInGame!: number;

  private matchesPerCard$: Observable<number>;
  private cardsInGame$: Observable<number>;

  private countMatchedCards: number = 0;
  private gameCardsComponents: ComponentRef<CardComponent>[] = [];
  private openedCardsComponent: CardComponent[] = [];
  private openedCards: string[] = [];
  
  private gameState: GameState = GameState.notStarted;
  public gameTimer$: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  private counter$: Observable<number> = interval(1000).pipe(map((v:number) => v+1));
  private counterSubscription!: Subscription;  

  private isLoggedIn$: Observable<boolean>;
  private bestPreviousResults$: Observable<Array<MemoryGameResult>>

  constructor(
    private http: HttpClient,
    private store: Store<AppStore>
  ) {
    this.isLoggedIn$ = this.store.select(state => state.authUser.isAuthenticated);
    this.bestPreviousResults$ = this.store.select(state => state.memoryGameResults.bestPreviousResults);
    this.matchesPerCard$ = this.store.select(state => state.memoryGameResults.matchesPerCard);
    this.cardsInGame$ = this.store.select(state => state.memoryGameResults.cardsInGame);
  }

  public openCard(cardComponent: CardComponent) {

    if(this.gameState === GameState.notStarted) {
      this.gameState = GameState.started;
      this.counterSubscription = this.counter$.subscribe((v) => {
        this.gameTimer$.next(v)
      })
    }

    this.openedCards.push(cardComponent.cardData.name);
    this.openedCardsComponent.push(cardComponent);

    this.matchesPerCard$.pipe(
      take(1)
    ).subscribe(
      matchesPerCard => {
        if(this.openedCards.length === matchesPerCard) {
          setTimeout(() => this.checkForMatch(), 500);
        }
      }
    )
  }

  public addGameCardComponent(cardComponentRef: ComponentRef<CardComponent>) {
    this.gameCardsComponents.push(cardComponentRef);
  }

  public checkForMatch() {
    const areMatched = allMatch(this.openedCards);

      for(let cardComponent of this.openedCardsComponent) { 
        if(areMatched) {
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

    combineLatest([this.matchesPerCard$, this.cardsInGame$]).subscribe(res => {
     this.matchesPerCard = res[0];
      this.cardsInGame = res[1];
    })

    if(this.countMatchedCards === this.cardsInGame * this.matchesPerCard) {

      this.gameState = GameState.finished;    

      this.isLoggedIn$.pipe(
        filter((isLoggedIn) => !!isLoggedIn),
        switchMap(() => this.bestPreviousResults$),
        tap((results) => {
          this.gameTimer$.pipe(take(1)).subscribe((time) => {
            
            const bestScore = results.find(result => (
                result.cardsInGame === this.cardsInGame && 
                result.matchesPerCard === this.matchesPerCard));

            if(!bestScore) {
              this.store.dispatch(saveGameResult({payload: {
                score: time,
                cardsInGame: this.cardsInGame,
                matchesPerCard: this.matchesPerCard
              }}))
            } else if (bestScore && bestScore.score > time) {
              this.store.dispatch(updateGameResult({ payload: {
                id: bestScore.id,
                score: time,
                cardsInGame: this.cardsInGame,
                matchesPerCard: this.matchesPerCard
              }}));               
            }
          });
        }),
        take(1)
      ).subscribe();      

      this.counterSubscription.unsubscribe();
    
      for(let cardComponent of this.gameCardsComponents) {
        setTimeout(() => {
          cardComponent.instance.isGameOver = true;
        }, 500);        
      }  
    }
  }

  public dispatchGetResultsAction(): void {
    this.store.dispatch(getGameResults());
  }

  public getUserResults(): Observable<any> {
    return this.http.get<any>('/api/memoryGameResults')
  }

  public saveResult(payload: SaveResult): Observable<any> {
    return this.http.post<any>('/api/memoryGameResults/save', payload)
  }

  public updateResult(payload: any): Observable<any> {
    return this.http.post<any>(`/api/memoryGameResults/update`, payload)
  }
}
