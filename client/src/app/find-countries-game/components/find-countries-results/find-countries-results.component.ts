import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { interval, merge, Observable, Subscription } from "rxjs";
import { filter, tap } from "rxjs/operators";
import { AppStore } from "src/app/app-store.model";

@Component({
    selector: "app-find-countries-results",
    templateUrl: "./find-countries-results.component.html",
    styleUrls: ["./find-countries-results.component.scss"]
})
export class FindCountriesResultComponent implements OnInit, OnDestroy{

    public timer: number = 0;
    private timerSub!: Subscription;

    private gameStarted$: Observable<number | undefined>;
    private gameFinished$: Observable<boolean>;

    private manageTimeSub: Subscription;

    constructor(
        private store: Store<AppStore>
    ) { 
        this.gameStarted$ = this.store.select(store => store.findCountriesGame.gameOnState.gameStartedAt);
        this.gameFinished$ = this.store.select(store => store.findCountriesGame.gameOnState.isGameFinished);

        this.manageTimeSub = merge(
            this.gameStarted$.pipe(
                tap((gameStartedAt) => {

                    this.timer = 0;

                    if(this.timerSub) {
                        this.timerSub.unsubscribe()
                    }

                    if(gameStartedAt) {
                        this.timerSub = interval(1000).subscribe(val => this.timer = val + 1)
                    } 
                })
            ),
            this.gameFinished$.pipe(
                filter(isFinished => isFinished),
                tap(() => {
                    if(this.timerSub) {
                        this.timerSub.unsubscribe()
                    }
                })
            )
        ).subscribe();
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        if(this.manageTimeSub) {
            this.manageTimeSub.unsubscribe()
        }
    }

}