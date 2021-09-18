import { Component, Input, OnDestroy, OnInit, ViewRef } from "@angular/core";
import { Store } from "@ngrx/store";
import { EMPTY, merge, Observable, partition, Subscription } from "rxjs";
import { filter, switchMap, take, tap } from "rxjs/operators";
import { AppStore } from "src/app/app-store.model";
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

@Component({
    selector: "app-find-countries-snack-bar",
    templateUrl: "./find-countries-snack-bar.component.html",
    styleUrls: ["./find-countries-snack-bar.component.scss"]
})
export class FindCountriesSnackBarComponent implements OnInit, OnDestroy {

    private countryToFind$: Observable<string>;
    private isGameOn$: Observable<boolean>;
    private isGameFinished$: Observable<boolean>;

    private countryToFindSub!: Subscription;
    private isGameOnSub!: Subscription;


    private barConfig: MatSnackBarConfig = {
        panelClass: "find-countries-snack-bar"
    }

    constructor(
        private snackBar: MatSnackBar,
        private store: Store<AppStore>
    ) {
        this.countryToFind$ = this.store.select(store => store.findCountriesGame.gameOnState.countryToFindNow)
        this.isGameOn$ = this.store.select(store => store.findCountriesGame.isGameOn)
        this.isGameFinished$ = this.store.select(store => store.findCountriesGame.gameOnState.isGameFinished)
    };

    ngOnInit(): void {  
        
        const [gameOn$, gameOff$] = partition(this.isGameOn$, value => value === true)

        this.isGameOnSub = merge(
            gameOn$.pipe(
                switchMap(() => this.isGameFinished$),
                tap((isGameFinished) => {
                    console.log("GameOn and not Finished")
                    if(!isGameFinished) {
                        this.countryToFindSub = this.countryToFind$.pipe(
                            tap((country) => {
                                if(country) {
                                    this.snackBar.dismiss();
                                    this.snackBar.open(`${country}`, undefined, this.barConfig)
                                }
                            })
                        ).subscribe()  
                    } else {
                        if(this.countryToFindSub) {
                            console.log("GameOn and Finished")
                            this.snackBar.dismiss();
                            this.snackBar.open("Game finished! Congratulation!", undefined, this.barConfig)
                            this.countryToFindSub.unsubscribe;
                        }
                    }
                })            
            ),
            gameOff$.pipe(
                tap(() => {
                    console.log("GameOff")
                    if(this.countryToFindSub) {
                        this.snackBar.dismiss();
                        this.countryToFindSub.unsubscribe;
                    } 
                })
            )
        ).subscribe();   
              
    }

    ngOnDestroy(): void {
        if(this.isGameOnSub) {
            this.isGameOnSub.unsubscribe();
        }
    }
}