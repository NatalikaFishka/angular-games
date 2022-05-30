import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { interval, merge, Observable, Subscription, timer } from "rxjs";
import { filter, tap } from "rxjs/operators";
import { AppStore } from "src/app/app-store.model";

@Component({
    selector: "app-puzzle-results",
    templateUrl: "./puzzle-results.component.html",
    styleUrls: ["./puzzle-results.component.scss"]
})
export class PuzzleResultComponent implements OnInit, OnDestroy{

    public timer: number = 0;
    public finalTime: number = this.timer;
    private timerSub!: Subscription;

    private gameIsOn$: Observable<boolean>;
    private gameFinishedWithSuccess$: Observable<boolean>;

    private manageTimeSub: Subscription;

    constructor(
        private store: Store<AppStore>
    ) { 
        this.gameIsOn$ = this.store.select(store => store.puzzleGame.isGameOn);
        this.gameFinishedWithSuccess$ = this.store.select(store => store.puzzleGame.finishedWithSuccess);

        this.manageTimeSub = merge(
            this.gameIsOn$.pipe(
                tap((gameIsOn) => {

                    if(this.timerSub) {
                        this.timerSub.unsubscribe()
                    }
                    
                    this.finalTime = this.timer;

                    if(gameIsOn) {
                        this.timerSub = interval(1000).subscribe(val => this.timer = val + 1)
                    } else {
                        this.timer = 0;
                    }

                })
            ),
            this.gameFinishedWithSuccess$.pipe(
                tap((finishedWithSuccess) => {

                    if(this.timerSub) {
                        this.timerSub.unsubscribe()
                    }

                    if(finishedWithSuccess) {    
                        this.timer = this.finalTime;
                    } else {
                        this.timer = 0;
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