import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { combineLatest, Observable, Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { AppStore } from "src/app/app-store.model";
import { changeCountryToFind, gameFinished } from "../store/actions/find-countries-game.actions";

@Injectable({
    providedIn: "root"
})
export class FindCountriesResultService {

    private countryToFind$: Observable<string>;
    private userSelectedPolygon$: Observable<{countryName: string; countryId: string}>;
    private mapDataCount$: Observable<number>;
    private foundCountriesIdsCount$: Observable<number>

    private trackResultsSubscription!: Subscription;
    private areAllFoundSubscription!: Subscription;

    constructor(
        private store: Store<AppStore>
    ) {
        this.countryToFind$ = this.store.select(store => store.findCountriesGame.gameOnState.countryToFindNow)
        this.userSelectedPolygon$ = this.store.select(store => store.findCountriesGame.gameOnState.currentUserSelection)
        this.mapDataCount$ = this.store.select(store => store.findCountriesGame.mapData.length)
        this.foundCountriesIdsCount$ = this.store.select(store => store.findCountriesGame.gameOnState.foundCountriesIds.length)
    }
    
    public trackResults(): void {

        if(this.trackResultsSubscription) {
            this.trackResultsSubscription.unsubscribe();
            this.areAllFoundSubscription.unsubscribe();
        }

        this.areAllFoundSubscription = combineLatest([this.mapDataCount$, this.foundCountriesIdsCount$]).subscribe(
            ([needToFind, found]) => {
                if(needToFind && needToFind === found) {
                    this.store.dispatch(gameFinished())
                }
            }
        )

        this.trackResultsSubscription = combineLatest([this.countryToFind$, this.userSelectedPolygon$]).pipe(
            filter(([countryToFind, userSelectedPolygon]) => {
                return (countryToFind !== "" && userSelectedPolygon.countryName !== "")
            })
        ).subscribe(
            ([countryToFind, userSelectedPolygon]) => {
                
                if(countryToFind && countryToFind === userSelectedPolygon.countryName) {
                    
                    this.store.dispatch(changeCountryToFind());
                    
                    // show Correct top snack bar??

                } else {
                    // show WRONG top snack bar

                }
            }
        )
    }

}