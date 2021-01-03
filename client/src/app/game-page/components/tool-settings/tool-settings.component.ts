import { Component, OnDestroy, OnInit } from '@angular/core';
import { DINO_CONFIG, GAME_SETTINGS } from '../../config';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CardCreatorService } from '../../services/card-creater.service';
import { GameResultService } from '../../services/game-result.service';
import { AppStore } from 'src/app/app-store.model';
import { Store } from '@ngrx/store';
import { merge, Observable, of, Subscription } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { MemoryGameResult } from '../../models';
import { setGameSettings } from '../../store/actions/game-result.actions';

@Component({
  selector: 'app-tool-settings',
  templateUrl: './tool-settings.component.html',
  styleUrls: ['./tool-settings.component.scss']
})
export class ToolSettingsComponent implements OnInit, OnDestroy{

  cardsInPlay: number = DINO_CONFIG.length;
  initialCardsInPlay: number = GAME_SETTINGS.cardsInGame;
  maxMatchesPerCard: number = 5;
  minMatchesPerCard: number = 2;
  form: FormGroup;
  private isLoggedIn$: Observable<boolean>;
  private isLoggedInSub: Subscription | undefined = undefined;

  public bestPreviousResult$: Observable<number | undefined>;
  private bestPreviousResultsSub: Subscription | undefined;

  private cardsInGame$: Observable<number | undefined>;
  private matchesPerCard$: Observable<number | undefined>;

  constructor(
    public cardCreatorService: CardCreatorService,
    public gameResultService: GameResultService,
    private fb: FormBuilder,
    private store: Store<AppStore>
  ) { 
    this.form = this.fb.group({
      cardsInGame: [this.initialCardsInPlay],
      matchesPerCard: [this.minMatchesPerCard]
    });
    this.isLoggedIn$ = this.store.select(store => store.authUser.isAuthenticated); 
    this.cardsInGame$ = this.store.select(store => store.memoryGameResults.cardsInGame); 
    this.matchesPerCard$ = this.store.select(store => store.memoryGameResults.matchesPerCard); 
    
    this.bestPreviousResult$ = merge(this.cardsInGame$, this.matchesPerCard$).pipe(
      switchMap(() => this.store.select(store => store.memoryGameResults.bestPreviousResults).pipe(
        switchMap((results) => of(results.find(result => (
          result.cardsInGame === this.form.value.cardsInGame && 
          result.matchesPerCard === this.form.value.matchesPerCard)))),
        map(data => data?.score)
      ))
    );
  }

  ngOnInit(): void {
    this.store.dispatch(setGameSettings({payload: this.form.value}));

    this.isLoggedInSub = this.isLoggedIn$.pipe(
      filter((isLoggedIn) => isLoggedIn)
    ).subscribe(() => this.gameResultService.dispatchGetResultsAction());
  
    this.bestPreviousResult$.subscribe(v => console.log("BEST" ,v))
  }

  ngOnDestroy(): void {
    this.gameResultService.resetGame();
    if(this.isLoggedInSub) {
      this.isLoggedInSub.unsubscribe();
    }
  }
  formSubmit() {
    this.store.dispatch(setGameSettings({payload: this.form.value}));
    this.cardCreatorService.createNewGame(this.form.value);
  }
}
