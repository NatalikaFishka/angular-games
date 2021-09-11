import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { combineLatest, Observable, of, Subscription } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { AppStore } from "src/app/app-store.model";
import { CardsCategory, MemoryGameResult } from "../../models";
import { GameResultService } from "../../services/game-result.service";

@Component({
    selector: 'app-track-results',
    templateUrl: "track-results.component.html",
    styleUrls: ["track-results.component.scss"]
})
export class TrackResultsComponent implements OnInit, OnDestroy{

    public isLoggedIn$: Observable<boolean>;
    private isLoggedInSub: Subscription | undefined = undefined;

    public bestPreviousResult$: Observable<any | undefined>;
    
    private cardsInGame$: Observable<number>;
    private matchesPerCard$: Observable<number>;
    private cardsCategory$: Observable<CardsCategory>;
    public bestPreviousResults$: Observable<any | undefined>;

    constructor(
        public gameResultService: GameResultService,
        private store: Store<AppStore>
    ) {
        this.isLoggedIn$ = this.store.select(store => store.authUser.isAuthenticated); 
        this.cardsCategory$ = this.store.select(store => store.memoryGameResults.cardsCategory); 
        this.cardsInGame$ = this.store.select(store => store.memoryGameResults.cardsInGame); 
        this.matchesPerCard$ = this.store.select(store => store.memoryGameResults.matchesPerCard); 
        this.bestPreviousResults$ = this.store.select(store => store.memoryGameResults.bestPreviousResults); 

        
        this.bestPreviousResult$ = combineLatest([this.bestPreviousResults$, this.cardsCategory$, this.cardsInGame$, this.matchesPerCard$]).pipe(
            switchMap(latestDataFromStore => {
                const [results, cardsCategory, cardsInGame, matchesPerCard] = latestDataFromStore;
                return of(results.find((result: MemoryGameResult) => (
                    result.cardsCategory === cardsCategory &&
                    result.cardsInGame === cardsInGame && 
                    result.matchesPerCard === matchesPerCard)))
            }),
            map(data => data?.score)
        );
    }

    ngOnInit(): void {
        this.isLoggedInSub = this.isLoggedIn$.subscribe((isLoggedIn) => {
              if(isLoggedIn) {
                  this.gameResultService.dispatchGetResultsAction();
                } else {
                  this.gameResultService.dispatchClearResultsAction();
              }
            });
      
    }

    ngOnDestroy(): void {
        if(this.isLoggedInSub) {
        this.isLoggedInSub.unsubscribe();
        }
    }
}