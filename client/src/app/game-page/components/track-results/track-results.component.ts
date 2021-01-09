import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { combineLatest, Observable, of, Subscription } from "rxjs";
import { filter, map, switchMap } from "rxjs/operators";
import { AppStore } from "src/app/app-store.model";
import { MemoryGameResult } from "../../models";
import { GameResultService } from "../../services/game-result.service";

@Component({
    selector: 'app-track-results',
    templateUrl: "track-results.component.html",
    styleUrls: ["track-results.component.scss"]
})
export class TrackResultsComponent implements OnInit, OnDestroy{

    private isLoggedIn$: Observable<boolean>;
    private isLoggedInSub: Subscription | undefined = undefined;

    public bestPreviousResult$: Observable<any | undefined>;
    
    private cardsInGame$: Observable<number | undefined>;
    private matchesPerCard$: Observable<number | undefined>;
    public bestPreviousResults$: Observable<any | undefined>;

    constructor(
        public gameResultService: GameResultService,
        private store: Store<AppStore>
    ) {
        this.isLoggedIn$ = this.store.select(store => store.authUser.isAuthenticated); 
        this.cardsInGame$ = this.store.select(store => store.memoryGameResults.cardsInGame); 
        this.matchesPerCard$ = this.store.select(store => store.memoryGameResults.matchesPerCard); 
        this.bestPreviousResults$ = this.store.select(store => store.memoryGameResults.bestPreviousResults); 
        
        this.bestPreviousResult$ = combineLatest([this.bestPreviousResults$, this.cardsInGame$, this.matchesPerCard$]).pipe(
            switchMap(latestDataFromStore => {
                const [results, cardsInGame, matchesPerCard] = latestDataFromStore;
                return of(results.find((result: MemoryGameResult) => (
                    result.cardsInGame === cardsInGame && 
                    result.matchesPerCard === matchesPerCard)))
            }),
            map(data => data?.score)
        );
    }

    ngOnInit(): void {
        this.isLoggedInSub = this.isLoggedIn$.pipe(
            filter((isLoggedIn) => isLoggedIn)
          ).subscribe(() => this.gameResultService.dispatchGetResultsAction());
      
    }

    ngOnDestroy(): void {
        if(this.isLoggedInSub) {
        this.isLoggedInSub.unsubscribe();
        }
    }
}