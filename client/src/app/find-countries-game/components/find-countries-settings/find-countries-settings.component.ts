import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { take, tap } from "rxjs/operators";
import { AppStore } from "src/app/app-store.model";
import { FindCountriesResultService } from "../../services/find-countries-result.service";
import * as actions from "../../store/actions/find-countries-game.actions";


const MapsToSelect = ["Russia", "USA"]
@Component({
    selector: "app-find-countries-settings",
    templateUrl: "./find-countries-settings.component.html",
    styleUrls: ["./find-countries-settings.component.scss"]
})
export class FindCountriesSettingsComponent implements OnInit {

    private initialMap: string = "Russia";
    public mapsToSelect: Array<string> = MapsToSelect;
    public form: FormGroup;

    public isGameOn$!: Observable<boolean>;
    private currentMap$: Observable<string>;

    constructor(
        private fb: FormBuilder,
        private store: Store<AppStore>,
        private resultService: FindCountriesResultService,
    ) {
        this.form = this.fb.group({
            selectedMap: [this.initialMap]
        });
        this.currentMap$ = this.store.select(store => store.findCountriesGame.currentMap);
    }
    ngOnInit() {
        this.store.dispatch(actions.setMapSelection({payload: this.form.value.selectedMap}));
        this.isGameOn$ = this.store.select(store => store.findCountriesGame.isGameOn);
    }

    formSubmit() {
        console.log('FORM DATA', this.form.value)
        this.currentMap$.pipe(
            tap((currentMap) => {
                if(currentMap !== this.form.value.selectedMap) {
                    this.store.dispatch(actions.setMapSelection({payload: this.form.value.selectedMap}));
                }
            }),
            take(1)
        ).subscribe();
    }

    startGame() {
        this.store.dispatch(actions.startGame());
        this.resultService.trackResults();
    }

    reStartGame() {
        this.store.dispatch(actions.startGame())
    }
}