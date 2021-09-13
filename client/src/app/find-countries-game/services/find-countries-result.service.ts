import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { combineLatest, Observable, Subscription } from "rxjs";
import { AppStore } from "src/app/app-store.model";
import { changeCountryToFind, gameFinished } from "../store/actions/find-countries-game.actions";

@Injectable({
    providedIn: "root"
})
export class FindCountriesResultService {

    private countryToFind$: Observable<string>;
    private userSelectedPolygon$: Observable<{countryName: string; countryId: string}>;
    private trackResultsSubscription!: Subscription;
    private regionsToFind$: Observable<number | undefined>;
    private foundRegions$: Observable<Array<string>>;

    constructor(
        private store: Store<AppStore>
    ) {
        this.countryToFind$ = this.store.select(store => store.findCountriesGame.countryToFind)
        this.userSelectedPolygon$ = this.store.select(store => store.findCountriesGame.userSelection)
        this.regionsToFind$ = this.store.select(store => store.findCountriesGame.regionsToFind)
        this.foundRegions$ = this.store.select(store => store.findCountriesGame.foundCountry)
    }
    
    public trackResults(): void {

        if(this.trackResultsSubscription) {
            this.trackResultsSubscription.unsubscribe()
        }

        this.trackResultsSubscription = combineLatest([this.countryToFind$, this.userSelectedPolygon$, this.regionsToFind$, this.foundRegions$]).subscribe(
            ([countryToFind, userSelectedPolygon, regionsToFind, foundRegions]) => {

                if(regionsToFind === foundRegions.length) {
                    this.store.dispatch(gameFinished())
                }
                
                console.log("Result: ", countryToFind === userSelectedPolygon.countryName)
                if(countryToFind === userSelectedPolygon.countryName) {
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