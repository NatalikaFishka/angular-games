import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { take, tap } from "rxjs/operators";
import { AppStore } from "src/app/app-store.model";
import { FindCountriesResultService } from "../../services/find-countries-result.service";
import * as actions from "../../store/actions/find-countries-game.actions";

import { Map, MAPS } from "../../configs/map.config";


@Component({
    selector: "app-find-countries-settings",
    templateUrl: "./find-countries-settings.component.html",
    styleUrls: ["./find-countries-settings.component.scss"]
})
export class FindCountriesSettingsComponent implements OnInit {

    public mapsToSelect: Array<Map> = MAPS;
    private initialMap: string = MAPS[0].name;
    public form: FormGroup;

    public isGameOn$!: Observable<boolean>;
    private currentMap$: Observable<string>;

    @Output() showHintTooltip: EventEmitter<boolean> = new EventEmitter<boolean>();

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