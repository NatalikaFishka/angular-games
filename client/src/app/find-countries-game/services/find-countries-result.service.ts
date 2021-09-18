import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { combineLatest, Observable, Subscription } from "rxjs";
import { filter, map, switchMapTo, tap } from "rxjs/operators";
import { AppStore } from "src/app/app-store.model";
import { changeCountryToFind, gameFinished } from "../store/actions/find-countries-game.actions";

@Injectable({
    providedIn: "root"
})
export class FindCountriesResultService {

    private countryToFind$: Observable<string>;
    private userSelectedPolygon$: Observable<{countryName: string; countryId: string}>;
    private trackResultsSubscription!: Subscription;
    private countriesLeftToFind$: Observable<Array<string>>;

    constructor(
        private store: Store<AppStore>
    ) {
        this.countryToFind$ = this.store.select(store => store.findCountriesGame.gameOnState.countryToFindNow)
        this.userSelectedPolygon$ = this.store.select(store => store.findCountriesGame.gameOnState.currentUserSelection)
        this.countriesLeftToFind$ = this.store.select(store => store.findCountriesGame.gameOnState.countriesLeftToFind)
    }
    
    public trackResults(): void {

        if(this.trackResultsSubscription) {
            this.trackResultsSubscription.unsubscribe()
        }

        this.trackResultsSubscription = combineLatest([this.countryToFind$, this.userSelectedPolygon$, this.countriesLeftToFind$]).pipe(
            tap(([countryToFind, userSelectedPolygon, countriesLeftToFind]) => {
                if (userSelectedPolygon.countryName !== "") {
                    return [countryToFind, userSelectedPolygon, countriesLeftToFind]
                } else {
                    return
                }
            })
        ).subscribe(
            ([countryToFind, userSelectedPolygon, countriesLeftToFind]) => {

                if(!countryToFind) {
                    this.store.dispatch(gameFinished())
                }
                
                console.log("Result: ", countryToFind === userSelectedPolygon.countryName)
                if(countryToFind && countryToFind === userSelectedPolygon.countryName) {
                    // change new country, - done
                    // mark map with other color - done
                    // isGameFinished
                    // show Correct top snack bar, 
                    this.store.dispatch(changeCountryToFind());


                } else {
                    // show WRONG top snack bar

                }
            }
        )
    }

}