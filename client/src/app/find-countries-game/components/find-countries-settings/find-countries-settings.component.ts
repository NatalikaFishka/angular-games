import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { take, tap } from "rxjs/operators";
import { AppStore } from "src/app/app-store.model";
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

    private currentMap$: Observable<string>;

    constructor(
        private fb: FormBuilder,
        private store: Store<AppStore>,
    ) {
        this.form = this.fb.group({
            selectedMap: [undefined]
        });
        this.currentMap$ = this.store.select(store => store.findCountriesGame.currentMap);
    }
    ngOnInit() {
        this.currentMap$.pipe(
            take(1)
        ).subscribe(map => this.initialMap = map);

        this.form.setValue({selectedMap: this.initialMap});
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
}