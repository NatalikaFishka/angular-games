import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { combineLatest, Observable, Subscription } from "rxjs";
import { AppStore } from "src/app/app-store.model";
import { changeCountryToFind } from "../store/actions/find-countries-game.actions";

@Injectable({
    providedIn: "root"
})
export class FindCountriesResultService {

    private countryToFind$: Observable<string>;
    private userSelectedPolygon$: Observable<{countryName: string; countryId: string}>;
    private trackResultsSubscription!: Subscription;

    constructor(
        private store: Store<AppStore>
    ) {
        this.countryToFind$ = this.store.select(store => store.findCountriesGame.countryToFind)
        this.userSelectedPolygon$ = this.store.select(store => store.findCountriesGame.userSelection)
    }

    public trackResults(): void {

        if(this.trackResultsSubscription) {
            this.trackResultsSubscription.unsubscribe()
        }

        this.trackResultsSubscription = combineLatest([this.countryToFind$, this.userSelectedPolygon$]).subscribe(
            ([countryToFind, userSelectedPolygon]) => {
                
                console.log("Result: ", countryToFind === userSelectedPolygon.countryName)
                if(countryToFind === userSelectedPolygon.countryName) {
                    // change new country, - done
                    // mark map with other color - done
                    // show Correct top snack bar, 
                    // isGameFinished
                    this.store.dispatch(changeCountryToFind());

                } else {
                    // show WRONG top snack bar

                }
            }
        )
    }

}